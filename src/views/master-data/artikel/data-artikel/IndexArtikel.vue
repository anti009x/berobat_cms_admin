<template>
    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <div class="d-flex justify-content-between">
                <h6 class="m-0 font-weight-bold text-primary">Data {{ $route.name }}</h6>
                <div class="d-flex justify-content-start">
                    <ButtonComponent v-if="$can('action', 'Dokter')" Color="btn-primary" Icon="fa-plus"
                        Message="Tambah Data" data-bs-toggle="modal" data-bs-target="#tambahData" />
                    <div v-if="selectedArtikelIds.length == 0">
                    </div>
                    <ButtonComponent Color="btn-danger" Icon="fa-trash" v-else-if="selectedArtikelIds" Message="hapus"
                        @click="deleteSelectedArtikels" />
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>pilih</th>
                            <th>Judul</th>
                            <th>Deskripsi</th>
                            <th>Penulis</th>
                            <th v-if="$can('show', 'Artikel')">Aksi</th>
                        </tr>
                    </thead>
                    <tbody v-if="isLoading">
                        <EmptyLoading />
                    </tbody>
                    <tbody v-else-if="dataArtikel.length == 0">
                        <EmptyData />
                    </tbody>
                    <template v-else>
                        <tbody v-for="(data, index) in dataArtikel" :key="index">
                            <tr>
                                <td>
                                    {{ index + 1 }}
                                </td>
                                <td>
                                    <input type="checkbox" :value="data.idArtikel" v-model="selectedArtikelIds">
                                </td>
                                <td>{{ data.judulArtikel }}</td>
                                <td>
                                    {{ data.deskripsi }}
                                </td>
                                <td>{{ data.getUser.nama }}</td>
                                <td v-if="$can('show', 'Artikel')">
                                    <div class="d-flex justify-content-start">
                                        <router-link :to="'artikel/' + data.idArtikel + '/edit'">
                                            <ButtonComponent Message="edit" Color="btn-warning" />
                                        </router-link>
                                        <a :href="data.foto" class="btn btn-primary btn-sm" target="_blank">
                                            lihat foto
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </table>
            </div>
        </div>
    </div>
    <ModalComponent id="tambahData" labelBy="exampleModalLabel" :modalTitle="'Tambah ' + $route.name">
        <template #modal>
            <Form :validation-schema="schema" v-slot="{ errors }" @submit="handleSubmit">
                <input type="text" hidden v-model="artikels.id_artikel">
                <div>
                    <Label for="foto">Foto Artikel</Label>
                    <input id="foto" type="file" @change="chooseFoto" class="form-control">
                    <span :class="[error]">{{ errors.foto }}</span>
                </div>
                <div>
                    <Label>Judul Artikel</Label>
                    <InputField Name="judulArtikel" v-model="artikels.judul_artikel" />
                    <span :class="[error]">{{ errors.judulArtikel }}</span>
                </div>
                <div>
                    <Label>Deskripsi</Label>
                    <textarea name="deskripsi" class="form-control border-primary" v-model="artikels.deskripsi"></textarea>
                </div>
                <div class="mt-2">
                    <ButtonComponent @click="handleSubmit" />
                </div>
            </Form>
        </template>
    </ModalComponent>
</template>

<script>
import axios from 'axios'
import Cookies from 'js-cookie'
import InputField from '@/components/partials-component/InputField.vue';
import { Form } from 'vee-validate'
import iziToast from 'izitoast';
import ButtonComponent from '@/components/partials-component/ButtonComponent.vue';
import ModalComponent from '@/components/partials-component/ModalComponent.vue';
import EmptyData from '@/components/empty-table/EmptyData.vue';
import EmptyLoading from '@/components/empty-table/EmptyLoading.vue';
import * as valid from 'yup'

export default {
    data() {
        return {
            dataArtikel: [],
            artikels: {
                judul_artikel: '',
                deskripsi: '',
                foto: null
            },
            isLoading: false,
            error: 'text-danger',
            selectedArtikelIds: [],
            editorData: "",
            editorConfig: {
                // The configuration of the editor.
            },
        };
    },
    computed: {
        schema() {
            let message = 'wajib diisi'
            return valid.object({
                judulArtikel: valid.string().required(message),
                deskripsi: valid.string().required(message)
            })
        },
        formData() {
            const formData = new FormData()

            formData.append('foto', this.artikels.foto)
            formData.append('judul_artikel', this.artikels.judul_artikel)
            formData.append('deskripsi', this.artikels.deskripsi)

            return formData;
        }
    },
    created() {
        this.getArtikel();
    },
    methods: {
        getArtikel() {
            const parsing = JSON.parse(Cookies.get('user'));
            const userId = parsing.data.id;
            const cekRole = parsing.data.getRole.idRole;
            const type = "getData";
            let url = null;
            if (cekRole === "RO-2003061") {
                url = [
                    "master/artikel", {}
                ]
            } else if (cekRole === "RO-2003062") {
                url = [`master/artikel/${userId}/get`, {}];
            }
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.dataArtikel = result.data;
                this.isLoading = false
                console.log(result.data);
            }).catch((err) => {
                console.log(err);
            });
        },
        getImage(foto) {
            return '/storage/' + foto
        },
        goBack() {
            window.location = '/master/artikel'
        },
        deleteSelectedArtikels() {
            if (this.selectedArtikelIds.length === 0) {
                return;
            }
            let type = "deleteData";
            let urls = this.selectedArtikelIds.map((idArtikel) => ["master/artikel", idArtikel]);
            this.$swal({
                icon: 'question',
                title: "Apakah kamu ingin menyimpan perubahan",
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: "Ya, Hapus",
                denyButtonText: "Jangan Hapus"
            }).then((results) => {
                if (results.isConfirmed) {
                    Promise.all(urls.map((url) => this.$store.dispatch(type, url)))
                    this.$swal({
                        icon: 'success',
                        text: 'data berhasil dihapus'
                    })
                    this.getArtikel();
                }
            })
                .catch((err) => {
                    console.log(err);
                });
            this.selectedArtikelIds = [];
        },
        handleSubmit() {
            const allowedFormats = ['image/jpeg', 'image/png', 'image/jpg'];
            const file = this.artikels.foto;
            const maxSizeInBytes = 5 * 1024 * 1024;

            if (file && allowedFormats.includes(file.type)) {
                if (file.size <= maxSizeInBytes) {
                    this.$store
                        .dispatch("postDataUpload", ['master/artikel', this.formData])
                        .then((result) => {
                            iziToast.success({
                                title: 'Success',
                                position: 'topRight',
                                message: 'Data Artikel Berhasil Ditambahkan',
                                timeout: 1000
                            });
                            this.goBack();
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
        postArtikel() {
            const url = 'https://berobatplus.shop/api/master/artikel';
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            axios.post(url, this.formData, config)
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        },
        chooseFoto(event) {
            this.artikels.foto = event.target.files[0];
        }
    },
    components: {
        ButtonComponent, ModalComponent, Form, InputField, EmptyData, EmptyLoading
    }
}
</script>