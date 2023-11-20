<template>
    <div class="col-lg-12 col-12">
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <div class="d-flex justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">Data {{ $route.name }}</h6>
                    <div class="d-flex justify-content-start">
                        <ButtonComponent Color="btn-primary" Message="Tambah Data" Icon="fa-plus" data-bs-toggle="modal"
                            data-bs-target="#tambahData" v-if="$can('action', 'Artikel')" />
                        <div v-if="selectedId.length === 0"></div>
                        <ButtonComponent v-else-if="selectedId" Icon="fa-trash" Color="btn-danger" @click="deleteData()" Message="Hapus" />
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-bordered" cellspacing="0">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th v-if="$can('action', 'Artikel')">pilih</th>
                                <th>Nama Kategori</th>
                                <th v-if="$can('action', 'Artikel')">Aksi</th>
                            </tr>
                        </thead>
                        <tbody v-if="isLoading">
                            <EmptyLoading />
                        </tbody>
                        <tbody v-else-if="kategoriArtikel.length == 0">
                            <EmptyData />
                        </tbody>
                        <template v-else>
                            <tbody v-for="(data, index) in kategoriArtikel" :key="index">
                                <tr>
                                    <td>{{ index + 1 }}</td>
                                    <td v-if="$can('action', 'Artikel')">
                                        <input type="checkbox" v-model="selectedId" :value="data.idKategoriArtikel">
                                    </td>
                                    <td>{{ data.namaKategori }}</td>
                                    <td v-if="$can('action', 'Artikel')">
                                        <div class="d-flex justify-content-start">
                                            <router-link :to="'kategori_artikel/' + data.idKategoriArtikel + '/edit'">
                                                <ButtonComponent Color="btn-warning" Message="Edit" />
                                            </router-link>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </template>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <ModalComponent id="tambahData" labelBy="exampleModalLabel" :modalTitle="'Tambah ' + $route.name">
        <template #modal>
            <Form @submit="postKategori" :validationSchema="schema" v-slot="{ errors }">
                <div>
                    <input type="text" hidden v-model="kategoris.id_kategori_artikel">
                    <Label>Nama Kategori</Label>
                    <InputField Name="namaKategori" v-model="kategoris.nama_kategori" />
                    <span :class="[error]">{{ errors.namaKategori }}</span>
                </div>
                <ButtonComponent Message="submit" />
            </Form>
        </template>
    </ModalComponent>
</template>

<script>
import { Form } from 'vee-validate'
import ButtonComponent from '@/components/partials-component/ButtonComponent.vue';
import ModalComponent from '@/components/partials-component/ModalComponent.vue';
import InputField from '@/components/partials-component/InputField.vue';
import iziToast from 'izitoast'
import * as validate from 'yup'
import EmptyLoading from '@/components/empty-table/EmptyLoading.vue';
import EmptyData from '@/components/empty-table/EmptyData.vue';
export default {
    data() {
        return {
            kategoriArtikel: [],
            kategoris: {
                nama_kategori: ''
            },
            isLoading: false,
            error: 'text-danger',
            selectedId: []
        };
    },
    computed: {
        schema() {
            return validate.object({
                namaKategori: validate.string().required('wajib diisii yaaaaa')
            })
        }
    },
    created() {
        this.getKategoriArtikel();
    },
    methods: {
        getKategoriArtikel() {
            let type = "getData";
            let url = [
                "master/kategori_artikel",
                {}
            ];
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.kategoriArtikel = result.data;
                this.isLoading = false
            }).catch((err) => {
                console.log(err);
            });
        },
        goBack() {
            window.location = '/master/kategori_artikel'
        },
        postKategori() {
            let type = "postData"
            let url = [
                "master/kategori_artikel", this.kategoris, {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                iziToast.success({
                    title: 'success',
                    position: 'topRight',
                    message: 'Data Kategori Artikel Berhasil Ditambahkan',
                    timeout: 1000
                })
                this.goBack()
                this.getKategoriArtikel()
            }).catch((err) => {
                console.log(err);
            })
        },
        deleteData() {
            if (this.selectedId.length === 0) {
                return;
            }
            let type = "deleteData";
            let urls = this.selectedId.map((idKategoriArtikel) => ["master/kategori_artikel", idKategoriArtikel]);
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
                    this.getKategoriArtikel();
                }
            })
                .catch((err) => {
                    console.log(err);
                });
            this.selectedId = [];
        },
    },
    components: { ButtonComponent, Form, InputField, ModalComponent, EmptyData, EmptyLoading }
}
</script>