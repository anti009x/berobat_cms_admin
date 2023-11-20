<template >
    <div class="card shadow">
        <div class="card-header">
            <div class="d-flex justify-content-between">
                <h6 class="m-0 font-weight-bold text-primary">Data {{ $route.name }}</h6>
                <div class="d-flex justify-content-start">
                    <!-- <ButtonComponent Color="btn-primary" Message="Tambah Data" Icon="fa-plus" data-bs-toggle="modal"
                    data-bs-target="#tambahData" />
                    <div v-if="selectedId.length === 0"></div>
                    <ButtonComponent Color="btn-danger" @click="deleteData()" Icon="fa-trash" Message="Hapus" v-else-if="selectedId"/> -->
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered" width="100%" cellspacing="0">
                    <thead>
                        <th>
                            No
                        </th>
                        <!-- <th>
                            pilih
                        </th> -->
                        <th>
                            Nama
                        </th>
                        <th>
                            Email
                        </th>
                        <th>
                            Nomor HP
                        </th>
                        <th>
                            No KTP
                        </th>
                        <th>
                            Aksi
                        </th>
                    </thead>
                    <tbody v-if="isLoading">
                        <EmptyLoading />
                    </tbody>
                    <tbody v-else-if="dataOwnerRs.length == 0">
                        <EmptyData />
                    </tbody>
                    <template v-else>
                        <tbody v-for="(data, index) in dataOwnerRs" :key="index">
                            <tr>
                                <td>
                                    {{ index + 1 }}
                                </td>
                                <!-- <td><input type="checkbox" :value="data.idOwner" v-model="selectedId"></td> -->
                                <td>{{ data.user.nama }}</td>
                                <td>{{ data.user.email }}</td>
                                <td>{{ data.user.nomorHp }}</td>
                                <td>{{ data.noKtp }}</td>
                                <td>
                                    <div class="d-flex justify-content-center">
                                        <!-- <router-link :to="'owner_rs/' + data.user.id">
                                            <ButtonComponent Message="Aktifkan akun" Color="btn-warning" />
                                        </router-link> -->
                                        <a :href="data.fileDokumen" class="btn btn-sm btn-icon-split me-2 rounded btn-info"
                                            target="_blank">
                                            <span class="icon text-white-50">
                                                <i class="fas fa-eye"></i>
                                            </span>
                                            <span class="text">
                                                dokumen
                                            </span>
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
    <ModalComponent id="tambahData" :modalTitle="'Tambah ' + $route.name">
        <template #modal>
            <Form @submit="postOwner" :validation-schema="schema" v-slot="{ errors }">
                <div class="row">
                    <div class="col-sm-6 col-6">
                        <div>
                            <label for="">Nama</label>
                            <InputField Name="nama" v-model="form.nama" />
                            <span :class="[error]">{{ errors.nama }}</span>
                        </div>
                        <div>
                            <label for="">Email</label>
                            <InputField Name="email" v-model="form.email" />
                            <span :class="[error]">{{ errors.email }}</span>
                        </div>
                        <div>
                            <label for="">Password</label>
                            <InputField Name="password" v-model="form.password" />
                            <span :class="[error]">{{ errors.password }}</span>
                        </div>
                    </div>
                    <div class="col-sm-6 col-6">
                        <div>
                            <label for="">Nomor Hp</label>
                            <InputField Name="nomor_hp" v-model="form.nomor_hp" />
                            <span :class="[error]">{{ errors.nomor_hp }}</span>
                        </div>
                        <div>
                            <label for="">Alamat</label>
                            <InputField Name="alamat" v-model="form.alamat" />
                            <span :class="[error]">{{ errors.alamat }}</span>
                        </div>
                        <div>
                            <label for="">NIK</label>
                            <InputField Name="noktp" v-model="form.no_ktp" />
                            <span :class="[error]">{{ errors.noktp }}</span>
                        </div>
                    </div>
                </div>
                <ButtonComponent />
            </Form>
        </template>
    </ModalComponent>
</template>
<script>
import ModalComponent from '@/components/partials-component/ModalComponent.vue';
import ButtonComponent from '@/components/partials-component/ButtonComponent.vue';
import { Form } from 'vee-validate';
import InputField from '@/components/partials-component/InputField.vue';
import iziToast from 'izitoast';
import EmptyData from '@/components/empty-table/EmptyData.vue';
import EmptyLoading from '@/components/empty-table/EmptyLoading.vue';
import * as valid from 'yup'
export default {
    data() {
        return {
            dataOwnerRs: [],
            form: {
                nama: '',
                email: '',
                password: '',
                nomor_hp: '',
                alamat: '',
                no_ktp: ''
            },
            isLoading: false,
            error: 'text-danger',
            selectedId: []
        }
    },
    computed: {
        schema() {
            let message = "wajib diisi"
            return valid.object({
                nama: valid.string().required(message),
                email: valid.string().required(message).email(),
                password: valid.string().required(message).min(8, "minimal 8 karakter"),
                nomor_hp: valid.string().required(message).min(12, "minimal 12 karakter").max(13, "minimal 13 karakter"),
                alamat: valid.string().required(message),
                noktp: valid.string().required(message).min(16, "minimal 16 karakter").max(16, "maksimal 16 karajtr")
            })
        }
    },
    created() {
        this.getOwner()
    },
    methods: {
        getOwner() {
            let type = "getData"
            let url = [
                "akun/owner_rs", {}
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.dataOwnerRs = result.data
                this.isLoading = false
            }).catch((err) => {
                console.log(err);
            })
        },
        goBack() {
            window.location = '/master/owner_rs'
        },
        postOwner() {
            let type = "postData"
            let url = [
                "akun/owner_rs", this.form
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.goBack()
            }).catch((err) => {
                console.log(err);
            })
        },
        deleteData() {
            if(this.selectedId == 0){
                return
            }
            let type = "deleteData"
            let urls = this.selectedId.map((idOwner)=> ["akun/owner_rs", idOwner])
            this.$swal({
                icon: 'question',
                title: 'apakah data ingin dihapus?',
                showDenyButton: false,
                showCancelButton: true,
                confirmButtonText: 'ya, hapus',
                denyButtonText: 'jangan hapus'
            }).then((result)=>{
                if(result.isConfirmed){
                    Promise.all(urls.map((url)=>this.$store.dispatch(type, url)))
                    this.$swal({
                        icon: 'success',
                        text: 'data berhasil dihapus'
                    })
                    this.getOwner()
                }
            }).catch((err)=>{
                console.log(err);
            })
            this.selectedId = []
        }
    },
    components: {
        InputField, Form, ButtonComponent, ModalComponent, EmptyData, EmptyLoading
    }
}
</script>
<style ></style>