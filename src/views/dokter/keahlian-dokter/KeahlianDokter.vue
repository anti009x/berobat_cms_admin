<template>
    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <div class="d-flex justify-content-between">
                <h6 class="m-0 font-weight-bold text-primary">Data {{ $route.name }}</h6>
                <div class="d-flex justify-content-start">
                    <ButtonComponent Message="Tambah Data" Icon="fa-plus" data-bs-toggle="modal"
                        data-bs-target="#tambahData" />
                    <div v-if="selectedId.length === 0"></div>
                    <ButtonComponent v-else-if="selectedId" Message="Hapus" Icon="fa-trash" @click="deleteKeahlian"
                        Color="btn-danger" />
                </div>

            </div>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th>no</th>
                            <th>Pilih</th>
                            <th>Bidang Keahlian</th>
                            <th class="text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody v-if="isLoading">
                        <EmptyLoading />
                    </tbody>
                    <tbody v-else-if="keahlianDokter.length === 0">
                        <EmptyData />
                    </tbody>
                    <template v-else>
                        <tbody v-for="(data, index) in keahlianDokter" :key="index">
                            <tr>
                                <td>
                                    {{ (iteration(index)) }}
                                </td>
                                <td>
                                    <input type="checkbox" v-model="selectedId" :value="data.idKeahlian">
                                </td>
                                <td>{{ data.namaKeahlian }}</td>
                                <td>
                                    <div class="d-flex justify-content-center">
                                        <router-link :to="'keahlian_dokter/' + data.idKeahlian + '/edit'">
                                            <ButtonComponent Message="Edit" Color="btn-warning" />
                                        </router-link>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </table>
                <div class="d-flex justify-content-end">
                    <Pagination :currentPage="pagination.currentPage" :rowsTotal="pagination.total"
                    :lastPage="pagination.lastPage" @onPageChange="onPageChange($event)" />
                </div>
            </div>
        </div>
    </div>
    <ModalComponent id="tambahData" :modalTitle="'tambah ' + $route.name">
        <template #modal>
            <Form @submit="postKeahlian" :validation-schema="schema" v-slot="{ errors }">
                <label for="">Nama Keahlian</label>
                <InputField Name="namaKeahlian" v-model="form.nama_keahlian" />
                <span class="text-danger">{{ errors.namaKeahlian }}</span>
                <input type="file" class="form-control" @change="chooseFoto">
                <div>
                    <ButtonComponent />
                </div>
            </Form>
        </template>
    </ModalComponent>
</template>

<script>
import Pagination from '@/components/partials-component/PaginationComponent.vue'
import ButtonComponent from '@/components/partials-component/ButtonComponent.vue'
import iziToast from 'izitoast'
import { Form } from 'vee-validate'
import InputField from '@/components/partials-component/InputField.vue'
import ModalComponent from '@/components/partials-component/ModalComponent.vue'
import * as valid from 'yup'
import EmptyLoading from '@/components/empty-table/EmptyLoading.vue'
import EmptyData from '@/components/empty-table/EmptyData.vue'
export default {
    data() {
        return {
            keahlianDokter: [],
            form: {
                nama_keahlian: '',
                logo: null
            },
            isLoading: false,
            pagination: {
                total: 0,
                perPage: 5,
                currentPage: 1,
                lastPage: 0,
                page: 0,
            },
            selectedId: []
        }
    },
    mounted() {
        this.getKeahlian()
    },
    computed: {
        schema() {
            return valid.object({
                namaKeahlian: valid.string().required('wajib diisi')
            })
        },
        formData() {
            const formData = new FormData()

            formData.append('logo', this.form.logo)
            formData.append('nama_keahlian', this.form.nama_keahlian)

            return formData;
        }
    },
    methods: {
        getKeahlian() {
            this.isLoading = true;
            const params = [
                `page=${this.pagination.page}`,
                `per_page=${this.pagination.perPage}`,
            ].join("&");
            this.$store.dispatch("getData", ["master/keahlian", params]).then((result) => {
                this.keahlianDokter = result.data;
                this.pagination.total = result.meta.total;
                this.pagination.currentPage = result.meta.currentPage;
                this.pagination.lastPage = result.meta.lastPage;
                this.isLoading = false;
            });
        },
        onPageChange(page) {
            this.pagination.page = page;
            this.getKeahlian();
        },
        goBack() {
            window.location = '/dokter/keahlian_dokter'
        },
        deleteKeahlian() {
            console.log('ada');
            if (this.selectedId === 0) {
                return;
            }
            let type = "deleteData"
            let urls = this.selectedId.map((idKeahlian) => ["master/keahlian", idKeahlian]);
            this.$swal({
                icon: 'question',
                title: "Apakah kamu ingin menghapus",
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: "Ya, Hapus",
                denyButtonText: "Jangan Hapus"
            }).then((result) => {
                if (result.isConfirmed) {
                    Promise.all(urls.map((url) => this.$store.dispatch(type, url)))
                    this.$swal({
                        icon: 'success',
                        text: 'data berhasil dihapus'
                    })
                    this.getKeahlian()
                }
            }).catch((err) => {
                console.log(err);
            })
        },
        iteration(index){
            return(
                (this.pagination.currentPage-1) * this.pagination.perPage + index + 1
            )
            
        },
        postKeahlian() {
            const allowedFormats = ['image/jpeg', 'image/png', 'image/jpg'];
            const file = this.form.logo;
            const maxSizeInBytes = 5 * 1024 * 1024;

            if (file && allowedFormats.includes(file.type)) {
                if (file.size <= maxSizeInBytes) {
                    const formData = this.formData;
                    let type = "postDataUpload";
                    this.$store
                        .dispatch(type, [formData, '/master/keahlian'])
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
        chooseFoto(event) {
            this.form.logo = event.target.files[0]
            console.log(this.form.logo);
        }
    },
    components: {
        ButtonComponent, ModalComponent, InputField, Form, EmptyData, EmptyLoading, Pagination
    }
}
</script>