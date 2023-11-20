<template>
    <div class="card shadow">
        <div class="card-header">
            <h6><b class="text-primary">{{ $route.name }}</b></h6>
        </div>
        <div class="card-body">
            <Form @submit="submitRs">
                <div class="container py-2 row">
                    <h6><b> {{ $route.name }} </b></h6>
                    <div class="col-sm-6 col-6">
                        <img :src="form.foto" class="img-fluid mb-3">
                        <label for="">Foto Rs</label>
                        <input Name="alamat" class="form-control" type="file" @change="chooseFoto">
                        <label for="">Nama Rumah Sakit</label>
                        <InputField Name="namaRs" v-model="form.namaRs" />
                        <ButtonComponent class="mb-3" />
                        <br>
                    </div>
                    <div class="col-sm-6 col-6">
                        <!-- <l-map v-if="form && form.latitude && form.longitude" :zoom="zoom"
                            :center="[form.latitude, form.longitude]" class="rounded" style="height:350px; width: 100%">
                            <l-tile-layer :url="tileLayerUrl"></l-tile-layer>
                            <l-marker v-if="selectedPosition" :lat-lng="[form.latitude, form.longitude]" :draggable="true"
                                @dragend="handleMarkerDrag"></l-marker>
                            </l-map> -->
                            <label for="" class="mt-2">Alamat RS</label>
                            <input type="text" class="form-control mb-3" v-model="form.alamatRs">
                            <label for="" class="mt-2">Latitude</label>
                            <input type="text" class="form-control mb-3" v-model="form.latitude">
                            <label for="" class="mt-2">Longitude</label>
                            <input type="text" class="form-control mb-3" v-model="form.longitude">
                            <label for="">Deskripsi RS</label>
                            <textarea class="form-control mb-3" row="4" v-model="form.deskripsiRs"></textarea>
                    </div>
                </div>
            </Form>
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
                namaRs: '',
                deskripsiRs: '',
                alamatRs: '',
                latitude: '',
                longitude: '',
                foto: null,
                gambarLama: ''
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

            formData.append('foto_rs', this.form.foto)
            formData.append('nama_rs', this.form.namaRs)
            formData.append('alamat_rs', this.form.alamatRs)
            formData.append('deskripsi_rs', this.form.deskripsiRs)
            formData.append('latitude', this.form.latitude)
            formData.append('longitude', this.form.longitude)
            formData.append('gambarLama', this.form.gambarLama)

            return formData;
        }
    },
    mounted() {
        this.geolocate()
    },
    created() {
        this.detailRumahSakit()
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

                this.fetchLocationDetails(latitude, longitude);

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
                    this.form.alamatRs = response.data.display_name;
                    console.log(response);
                })
                .catch(error => {
                    console.error('Error occurred while fetching location details:', error);
                });
        },
        detailRumahSakit() {
            let type = "getData";
            let url = [`master/rumah_sakit/data/${this.idFromParams}/edit`, {}];
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
        chooseFoto(event) {
            this.form.foto = event.target.files[0]
            console.log(this.form.foto);
        },
        submitRs(){
            const params = this.$route.params.id
            const allowedFormats = ['image/jpeg', 'image/png', 'image/jpg'];
            const file = this.form.foto;
            const maxSizeInBytes = 5 * 1024 * 1024;
            if (file && allowedFormats.includes(file.type)) {
                if (file.size <= maxSizeInBytes) {
                    this.$store
                        .dispatch("postDataUpload", [`master/rumah_sakit/data/${params}?_method=put`, this.formData])
                        .then((result) => {
                            iziToast.success({
                                title: 'Success',
                                position: 'topRight',
                                message: 'Data Rumah Sakit Berhasil Diubah',
                                timeout: 1000
                            });
                            this.$router.back()
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