<template>
    <div class="card shadow">
        <div class="card-header">
            <h6 class="text-primary font-weight-bold">
                Data Apotek
            </h6>
        </div>
        <div class="card-body">
            <div class="row">
                <l-map :zoom="zoom" :center="mapCenter" class="rounded mb-3" style="height:350px; width: 50%">
                    <l-tile-layer :url="tileLayerUrl"></l-tile-layer>
                    <l-marker v-if="selectedPosition" :lat-lng="selectedPosition" :draggable="true"
                        @dragend="handleMarkerDrag"></l-marker>
                </l-map>
                <div class="col-6 col-sm-6">
                    <label for="">Foto Apotek</label>
                    <br>
                    <input type="file" @change="chooseFoto" name="" id="">
                    <br>
                    <label for="">Nama Apotek</label>
                    <InputField v-model="form.nama_apotek" />
                    <label for="">Deskripsi</label>
                    <InputField v-model="form.deskripsi_apotek" />
                    <label for="">Nomor HP</label>
                    <InputField v-model="form.nomor_hp_apotek" />
                </div>
                <div class="col-6 col-sm-6">
                    <label for="">Alamat</label>
                    <input type="text" class="form-control mb-3" :value="locationName" />
                    <label for="">Latitude</label>
                    <input type="text" class="form-control mb-3" :value="latitude"  />
                    <label for="">Longitude</label>
                    <input type="text" class="form-control mb-3" :value="longitude"  />

                </div>
            </div>
            <h6 class="text-primary font-weight-bold">
                Data Admin Apotek
            </h6>
            <div class="row">
                <div class="col-6 col-sm-6">
                    <label for="">Nama Admin</label>
                    <InputField v-model="form.nama" />
                    <label for="">Nomor Hp</label>
                    <InputField v-model="form.nomor_hp" />
                </div>
                <div class="col-6 col-sm-">
                    <label for="">Jenis Kelamin</label>
                    <InputField v-model="form.jenis_kelamin" />
                    <label for="">Password</label>
                    <InputField type="password" v-model="form.password" />
                </div>
            </div>
            <ButtonComponent @click="postApotek" />
        </div>
    </div>
</template>
<script>
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import iziToast from 'izitoast'
import ButtonComponent from '@/components/partials-component/ButtonComponent.vue';
import InputField from '@/components/partials-component/InputField.vue';
export default {
    data() {
        return {
            form: {
                nama_apotek: '',
                deskripsi_apotek: '',
                alamat_apotek: '',
                nomor_hp: '',
                nomor_hp_apotek: '081233232273',
                password: '',
                jenis_kelamin: 'L',
                nama: '',
                foto_apotek: null,
                latitude: '',
                longitude: ''
            },
            tileLayerUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            selectedPosition: null,
            locationName: null,
            zoom: 10,
            latitude: null,
            longitude: null
        }
    },
    computed: {
        mapCenter() {
            return this.selectedPosition || [0, 0];
        },
        formData() {
            const { nama_apotek, foto_apotek, deskripsi_apotek, nomor_hp, nomor_hp_apotek, password, jenis_kelamin, nama, alamat_apotek, latitude, longitude } = this.form;
            const formData = new FormData();

            formData.append('nama_apotek', nama_apotek);
            formData.append('deskripsi_apotek', deskripsi_apotek);
            formData.append('nomor_hp', nomor_hp);
            formData.append('nomor_hp_apotek', nomor_hp_apotek);
            formData.append('password', password);
            formData.append('jenis_kelamin', jenis_kelamin);
            formData.append('nama', nama);
            formData.append('foto_apotek', foto_apotek);

            formData.append('alamat_apotek', this.locationName); // Use this.locationName directly
            formData.append('latitude', this.latitude); // Use this.latitude directly
            formData.append('longitude', this.longitude); // Use this.longitude directly

            return formData;
        },
    },
    mounted() {
        this.geolocate()
    },
    methods: {
        postApotek() {
            let type = "postData"
            let url = [
                "apotek/pengaturan/profil_apotek", {
                    nama_apotek: this.form.nama_apotek,
                    deskripsi_apotek: this.form.deskripsi_apotek,
                    alamat_apotek: this.locationName,
                    nomor_hp: this.form.nomor_hp,
                    nomor_hp_apotek: this.form.nomor_hp,
                    password: this.form.password,
                    jenis_kelamin: this.form.jenis_kelamin,
                    nama: this.form.nama,
                    latitude: this.latitude,
                    longitude: this.longitude
                }, {}
            ]
            this.$store.dispatch(type, url).then((result) => {

            }).catch((err) => {
                console.log(err);
            })
        },
        geolocate() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        const latitude = position.coords.latitude;
                        const longitude = position.coords.longitude;
                        this.fetchLocationDetails(latitude, longitude);
                    },
                    error => {
                        console.error('Error occurred while retrieving current location:', error);
                    }
                );
            } else {
                console.error('Geolocation is not supported by this browser.');
            }
        },
        handleMarkerDrag(e) {
            if (e && e.target) {
                const latitude = e.target._latlng.lat;
                const longitude = e.target._latlng.lng;
                this.selectedPosition = [latitude, longitude];
                this.fetchLocationDetails(latitude, longitude);
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
                    this.selectedPosition = [response.data.lat, response.data.lon];
                    this.latitude = response.data.lat,
                        this.longitude = response.data.lon
                    console.log(response);
                })
                .catch(error => {
                    console.error('Error occurred while fetching location details:', error);
                });
        },
        postApotek() {
            const allowedFormats = ['image/jpeg', 'image/png', 'image/jpg'];
            const file = this.form.foto_apotek;
            const maxSizeInBytes = 5 * 1024 * 1024;

            if (file && allowedFormats.includes(file.type)) {
                if (file.size <= maxSizeInBytes) {
                    this.$store
                        .dispatch("postDataUpload", ['apotek/pengaturan/profil_apotek', this.formData])
                        .then((result) => {
                            iziToast.success({
                                title: 'Success',
                                position: 'topRight',
                                message: 'Data Rumah Sakit Berhasil Ditambahkan',
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
        },
        chooseFoto(event) {
            this.form.foto_apotek = event.target.files[0];
        },
    },
    components: {
        InputField,
        ButtonComponent,
        LMap, LTileLayer, LMarker
    }
}

</script>