<template>
    <div class="card shadow">
        <div class="card-header">
            <h6><b class="text-primary">{{ $route.name }}</b></h6>
        </div>
        <div class="card-body">
            <Form :validation-schema="schema" v-slot="{ errors }">
                <!-- <l-map :zoom="zoom" :center="mapCenter" class="rounded mb-3" style="height:350px; width: 50%">
                    <l-tile-layer :url="tileLayerUrl"></l-tile-layer>
                    <l-marker v-if="selectedPosition" :lat-lng="selectedPosition" :draggable="true"
                        @dragend="handleMarkerDrag"></l-marker>
                </l-map> -->
                <div class="row">
                    <h6 class="mt-1"><b>Data Rumah Sakit</b></h6>
                    <div class="col-sm-6 col-6">
                        <div>
                            <label for="">Nama Rumah Sakit</label>
                            <InputField Name="namaRs" v-model="form.nama_rs" />
                            <span :class="'text-danger'">{{ errors.namaRs }}</span>
                            <label for="">Foto Rs</label>
                            <input Name="alamat" class="form-control" type="file" @change="chooseFoto">
                        </div>
                        <div>
                            <label for="">Latitude</label>
                            <input type="text" class="form-control mb-3" v-model="form.latitude" />
                        </div>
                    </div>
                    <div class="col-sm-6 col-6">
                        <label for="">Alamat</label>
                        <input type="text" class="form-control mb-3" v-model="form.alamat_rs" />
                        <label for="">Longitude</label>
                        <input type="text" class="form-control mb-3" v-model="form.longitude" />
                        <label for="">Deskripsi</label>
                        <textarea Name="deskripsi" class="form-control" rows="3" v-model="form.deskripsi_rs"></textarea>
                    </div>
                </div>
                <div class="d-flex justify-content-between mt-3">
                    <ButtonComponent @click="postRumahSakit" />
                    <router-link to="/master/rumah_sakit">
                        <ButtonComponent Color="btn-dark" Message="Kembali" />
                    </router-link>
                </div>
            </Form>
        </div>
    </div>
</template>
<script>
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { Form } from 'vee-validate'
import ButtonComponent from '@/components/partials-component/ButtonComponent.vue'
import InputField from '@/components/partials-component/InputField.vue'
import iziToast from 'izitoast'
import * as validate from 'yup'
export default {
    data() {
        return {
            form: {
                nama_rs: '',
                deskripsi_rs: '',
                foto_rs: null,
                latitude: '',
                longitude: '',
                alamat_rs:''
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
        formData() {
            const { nama_rs, deskripsi_rs, foto_rs, latitude, longitude, alamat_rs } = this.form;
            const formData = new FormData();

            formData.append('foto_rs', foto_rs);
            formData.append('nama_rs', nama_rs);
            formData.append('deskripsi_rs', deskripsi_rs);
            formData.append('alamat_rs', alamat_rs); 
            formData.append('latitude', latitude); 
            formData.append('longitude', longitude);

            return formData;
        },
        mapCenter() {
            return this.selectedPosition || [0, 0];
        },
        schema() {
            return validate.object({
                namaRs: validate.string().required('wajib diisi'),
                latitude: validate.string().required('wajib diisi'),
                longitude: validate.string().required('wajib diisi')
            })
        }
    },
    mounted() {
        this.geolocate()
    },
    methods: {
        postRumahSakit() {
            const allowedFormats = ['image/jpeg', 'image/png', 'image/jpg'];
            const file = this.form.foto_rs;
            const maxSizeInBytes = 5 * 1024 * 1024;

            if (file && allowedFormats.includes(file.type)) {
                if (file.size <= maxSizeInBytes) {
                    this.$store
                        .dispatch("postDataUpload", ['master/rumah_sakit/data', this.formData])
                        .then((result) => {
                            iziToast.success({
                                title: 'Success',
                                position: 'topRight',
                                message: 'Data Rumah Sakit Berhasil Ditambahkan',
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
        },
        chooseFoto(event) {
            this.form.foto_rs = event.target.files[0];
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
    },
    components: {
        ButtonComponent, InputField, Form, LMap, LTileLayer, LMarker

    }
}
</script>