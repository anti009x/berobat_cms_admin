<template>
    <div class="card shadow">
        <div class="card-header">
            <h6><b class="text-primary">{{ $route.name }}</b></h6>
        </div>
        <div class="card-body">
                <div class="container py-2 row">
                    <h6><b> Data Apotek </b></h6>
                    <div class="col-sm-6 col-6">
                        <l-map v-if="form && form.latitude && form.longitude" :zoom="zoom"
                            :center="[form.latitude, form.longitude]" class="rounded" style="height:350px; width: 100%">
                            <l-tile-layer :url="tileLayerUrl"></l-tile-layer>
                            <l-marker v-if="selectedPosition" :lat-lng="[form.latitude, form.longitude]" :draggable="true"
                                @dragend="handleMarkerDrag"></l-marker>
                        </l-map>
                        <br>
                        <input type="file" @change="chooseFoto">
                        <br>
                        <label for="">Nama Apotek</label>
                        <InputField Name="namaRs" v-model="form.namaApotek" />
                        <label for="">Alamat</label>
                        <input type="text" class="form-control mb-3" :value="locationName">
                        <label for="">Latitude</label>
                        <input type="text" class="form-control mb-3" :value="latitude">
                    </div>
                    <div class="col-sm-6 col-6">
                        <label for="">Longitude</label>
                        <input type="text" class="form-control mb-3" v-model="form.longitude">
                        <label for="">Nomor Hp Apotek</label>
                        <InputField Name="nomorHp" v-model="form.nomorHpApotek" />
                        <label for="">Deskripsi</label>
                        <textarea class="form-control mb-3" row="4" v-model="form.deskripsiApotek"></textarea>
                    </div>
                </div>
                <div class="container py-2 row">
                    <h6><b> Data Admin Apotek </b></h6>
                    <div class="col-sm-6 col-6">
                        <label for="">Nama</label>
                        <InputField Name="nama" v-model="form.nama" />
                        <label for="">Jenis Kelamin</label>
                        <InputField Name="jenis" v-model="form.jenisKelamin" />
                    </div>
                    <div class="col-sm-6 col-6">
                        <label for="">Nomor Hp</label>
                        <InputField Name="nomorHp" v-model="form.nomorHp" />
                        <label for="">Password</label>
                        <InputField Name="password" v-model="form.password" />
                        <div class="d-flex justify-content-end">
                            <ButtonComponent class="mb-3" @click="postApotek" />
                        </div>
                    </div>
                </div>
        </div>
    </div>
</template>
<script>
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import iziToast from 'izitoast'
import InputField from '@/components/partials-component/InputField.vue'
import ButtonComponent from '@/components/partials-component/ButtonComponent.vue'
import { Form } from 'vee-validate'
export default {
    data() {
        return {
            form: {
                namaApotek: '',
                deskripsiApotek: '',
                alamatApotek: '',
                nomorHp: '',
                nomorHpApotek: '',
                password: '',
                jenisKelamin: '',
                nama: '',
                latitude: '',
                longitude: '',
                fotoApotek: ''
            },
            zoom: 15,
            tileLayerUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            selectedPosition: null,
            locationName: null,
            latitude: null,
            longitude: null
        }
    },
    computed: {
        idFromParams() {
            return this.$route.params.id
        },
        mapCenter() {
            return this.selectedPosition || [0, 0];
        },
        formData() {
            const formData = new FormData()

            formData.append('nama_apotek', this.form.namaApotek)
            formData.append('deskripsi_apotek', this.form.deskripsiApotek)
            formData.append('alamat_apotek', this.form.alamatApotek)
            formData.append('nomorHp', this.form.nomorHp)
            formData.append('nomor_hp_apotek', this.form.nomorHpApotek)
            formData.append('password', this.form.password)
            formData.append('jenis_kelamin', this.form.jenisKelamin)
            formData.append('nama', this.form.nama)
            formData.append('longitude', this.form.longitude)
            formData.append('latitude', this.form.latitude)
            formData.append('foto_apotek', this.form.fotoApotek)
            formData.append('gambarLama', this.form.gambarLama)

            return formData;
        }
    },
    mounted() {
        this.geolocate()
    },
    created() {
        this.detailApotek()
    },
    methods: {
        geolocate(latitude, longitude) {
            this.fetchLocationDetails(latitude, longitude);
        },
        handleMarkerDrag(e) {
            if (e && e.target) {
                const latitude = e.target._latlng.lat;
                const longitude = e.target._latlng.lng;
                this.selectedPosition = [latitude, longitude];

                // Fetch the address based on the dragged marker's latitude and longitude
                this.fetchLocationDetails(latitude, longitude);

                // Update the form's latitude and longitude based on the dragged marker
                this.form.latitude = latitude;
                this.form.longitude = longitude;
            }
        },
        fetchLocationDetails(latitude, longitude) {
            axios
                .get('https://nominatim.openstreetmap.org/reverse', {
                    params: {
                        lat: latitude,
                        lon: longitude,
                        format: 'jsonv2',
                    },
                })
                .then(response => {
                    this.locationName = response.data.display_name;
                    this.latitude = response.data.lat
                    this.longitude = response.data.lon
                    this.selectedPosition = [response.data.lat, response.data.lon];
                    this.form.alamatApotek = response.data.display_name;
                    console.log(response);
                })
                .catch(error => {
                    console.error('Error occurred while fetching location details:', error);
                });
        },
        detailApotek() {
            let type = "getData";
            let url = [`apotek/pengaturan/profil_apotek/${this.idFromParams}/edit`, {}];
            this.$store
                .dispatch(type, url)
                .then((result) => {
                    this.form = result.data;
                    this.selectedPosition = [
                        parseFloat(result.data.latitude),
                        parseFloat(result.data.longitude),
                    ];
                    this.fetchLocationDetails(
                        parseFloat(result.data.latitude),
                        parseFloat(result.data.longitude)
                    );
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        submitRs() {
            const params = this.$route.params.id
            let type = "postData"
            let url = [
                `apotek/pengaturan/profil_apotek/${params}?_method=put`, {
                    nama_apotek: this.form.namaApotek,
                    deskripsi_apotek: this.form.deskripsiApotek,
                    alamat_apotek: this.form.alamatApotek,
                    nomor_hp: this.form.nomorHp,
                    nomor_hp_apotek: this.form.nomorHpApotek,
                    password: this.form.password,
                    jenis_kelamin: this.form.jenisKelamin,
                    nama: this.form.nama,
                    latitude: this.form.latitude,
                    longitude: this.form.longitude
                }
            ]
            this.$store.dispatch(type, url).then((result) => {
                if(result.success === false){
                    iziToast.error({
                    title: 'galat',
                    message: result.message,
                    position: 'topRight',
                    timeout: 1000
                })
                } else {
                    iziToast.success({
                    title: 'success',
                    message: 'data berhasil diubah',
                    position: 'topRight',
                    timeout: 1000
                })
                this.$router.back()
                }
            }).catch((err) => {
                console.log(err);
            })
        },
        chooseFoto(event) {
            this.form.fotoApotek = event.target.files[0]
            console.log(this.form.foto);
        },
        postApotek(){
            const params = this.$route.params.id
            const allowedFormats = ['image/jpeg', 'image/png', 'image/jpg'];
            const file = this.form.fotoApotek;
            const maxSizeInBytes = 5 * 1024 * 1024;
            if (file && allowedFormats.includes(file.type)) {
                if (file.size <= maxSizeInBytes) {
                    this.$store
                        .dispatch("postDataUpload", [`apotek/pengaturan/profil_apotek/${params}?_method=put`, this.formData])
                        .then((result) => {
                            iziToast.success({
                                title: 'Success',
                                position: 'topRight',
                                message: 'Data Rumah Sakit Berhasil Diubah',
                                timeout: 1000
                            });
                            // this.$router.back()
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                } else {
                    iziToast.error({
                        title: 'Error',
                        message: 'Maaf, ukuran file gambar terlalu besar. Maksimum ukuran file adalah 5MB.',
                        position: 'topRight'
                    });
                }
            } else {
                iziToast.error({
                    title: 'Error',
                    message: 'Maaf, format yang diperbolehkan hanya jpg, png, jpeg',
                    position: 'topRight'
                });

            }
        }
    },
    components: {
        InputField,
        ButtonComponent,
        Form,
        LMap, LTileLayer, LMarker
    }
}
</script>