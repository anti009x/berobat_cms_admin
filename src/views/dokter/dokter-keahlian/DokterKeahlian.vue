<template>
    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <div class="d-flex justify-content-between">
                <h6 class="m-0 font-weight-bold text-primary">Data {{ $route.name }}</h6>
                <div class="d-flex justify-content-start">
                    <ButtonComponent Message="Tambah Data" Icon="fa-plus" data-bs-toggle="modal" data-bs-target="#tambahData" />
                    <div v-if="selected.length === 0"></div>
                    <ButtonComponent Color="btn-danger" Icon="fa-trash" Message="Hapus" v-else-if="selected" @click="deleteData" />
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <!-- <th>no</th> -->
                            <th>Pilih</th>
                            <th>Nama Dokter</th>
                            <th>Bidang Keahlian</th>
                            <th class="text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody v-if="isLoading">
                        <EmptyLoading />
                    </tbody>
                    <tbody v-else-if="dokterKeahlian.length == 0">
                        <EmptyData />
                    </tbody>
                    <template v-else>
                        <tbody v-for="(data, index) in dokterKeahlian" :key="index">
                            <template v-if="data.user.idRole == 'RO-2003062'">
                                <tr>
                                    <!-- <td>
                                        {{ index + 1 }}
                                    </td> -->
                                    <td>
                                        <input type="checkbox" :value="data.idMaster" v-model="selected">
                                    </td>
                                    <td v-if="data.user">
                                        {{ data.user.nama }}
                                    </td>
                                    <td v-else>
                                        data ga ada
                                    </td>
                                    <td v-if="data.keahlianId">
                                        {{ data.keahlianId.namaKeahlian }}
                                    </td>
                                    <td v-else>
                                        data tidak ada
                                    </td>
                                    <td>
                                        <div class="d-flex justify-content-center">
                                            <router-link :to="'dokter_keahlian/' + data.idMaster + '/edit'">
                                                <ButtonComponent Message="Edit" Color="btn-warning" />
                                            </router-link>
                                        </div>
                                    </td>
                                </tr>
                            </template>
                        </tbody>
                    </template>
                </table>
            </div>
        </div>
    </div>
    <ModalComponent id="tambahData" :modalTitle="'tambah ' + $route.name">
        <template #modal>
            <Form @submit="postKeahlian">
                <div class="mb-3">
                    <SelectOption v-model="form.user_ahli_id" Width="w-100" Label="Nama Dokter">
                        <template #option>
                            <option value="">pilih dokter</option>
                            <option :value="data.userId.id" v-for="data in dokter" :key="index">{{
                                data.userId.nama }}
                            </option>
                        </template>
                    </SelectOption>
                </div>
                <div class="mb-3">
                    <SelectOption v-model="form.keahlian_id" Width="w-100" Label="Nama Spesialis">
                        <template #option>
                            <option value="">pilih keahlian</option>
                            <option :value="data.idKeahlian" v-for="data in keahlian" :key="index">{{
                                data.namaKeahlian }}
                            </option>
                        </template>
                    </SelectOption>
                </div>
                <div>
                    <ButtonComponent />
                </div>
            </Form>
        </template>
    </ModalComponent>
</template>

<script>
import SelectOption from '@/components/partials-component/SelectOption.vue'
import ButtonComponent from '@/components/partials-component/ButtonComponent.vue'
import iziToast from 'izitoast'
import { Form } from 'vee-validate'
import InputField from '@/components/partials-component/InputField.vue'
import ModalComponent from '@/components/partials-component/ModalComponent.vue'
import EmptyLoading from '@/components/empty-table/EmptyLoading.vue';
import EmptyData from '@/components/empty-table/EmptyData.vue';
export default {
    data() {
        return {
            dokterKeahlian: [],
            spesialis: [],
            keahlian: [],
            dokter: [],
            selected: [],
            form: {
                user_ahli_id: '',
                keahlian_id: ''
            },
            isLoading: false
        }
    },
    created() {
        this.getSpesialis(),
            this.getDokter(),
            this.getKeahlianDokter(),
            this.getKeahlian()
    },
    methods: {
        getKeahlianDokter() {
            let type = "getData"
            let url = [
                "master/ahli/keahlian/master", {}
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.dokterKeahlian = result.data
                this.isLoading = false
            }).catch((err) => {
                console.log(err);
            })
        },
        getDokter() {
            let type = "getData";
            let url = [
                "akun/dokter/data",
                {}
            ];
            this.$store.dispatch(type, url).then((result) => {
                this.dokter = result.data
            }).catch((err) => {
                console.log(err);
            });
        },
        getSpesialis() {
            let type = "getData"
            let url = [
                "master/penyakit/spesialis_penyakit"
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.isLoading = false
                this.spesialis = result.data
            }).catch((err) => {
                console.log(err);
            })
        },
        getKeahlian(){
            let type = "getData"
            let url = [
                "master/keahlian", {}
            ]
            this.$store.dispatch(type, url).then((result)=>{
                this.keahlian = result.data
            }).catch((err)=>{
                console.log(err);
            })
        },
        goBack() {
            window.location = '/dokter/dokter_keahlian'
        },
        deleteData() {
            if (this.selected.length === 0) {
                return;
            }
            let type = "deleteData";
            let urls = this.selected.map((idDokterKeahlian) => ["master/ahli/keahlian/master", idDokterKeahlian]);
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
                    this.getKeahlianDokter();
                }
            })
                .catch((err) => {
                    console.log(err);
                });
            this.selected = [];
        },
        postKeahlian() {
            let type = "postData"
            let url = [
                "master/ahli/keahlian/master", this.form
            ]
            this.$store.dispatch(type, url).then((result) => {
                iziToast.success({
                    title: 'success'
                })
                // this.goBack()
            }).catch((err) => {
                console.log(err);
            })
        }
    },
    components: {
        ButtonComponent, ModalComponent, InputField, Form, SelectOption, EmptyData, EmptyLoading
    }
}
</script>