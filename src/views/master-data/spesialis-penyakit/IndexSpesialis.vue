<template>
    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <div class="d-flex justify-content-between">
                <h6 class="m-0 font-weight-bold text-primary">Data {{ $route.name }}</h6>
                <div class="d-flex justify-content-start" v-if="$can('action', 'Admin')">
                    <ButtonComponent Message="Tambah data +" data-bs-toggle="modal" data-bs-target="#tambahData"/>
                    <div v-if="selectedId.length == 0"></div>
                    <ButtonComponent v-else-if="selectedId" Color="btn-danger" @click="deleteSpesialis()" Message="Hapus" />
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th v-if="$can('action', 'Admin')">Pilih</th>
                            <th>Nama</th>
                            <th>Icon</th>
                            <th v-if="$can('action', 'Admin')">Aksi</th>
                        </tr>
                    </thead>
                    <tbody v-if="isLoading">
                        <EmptyLoading />
                    </tbody>
                    <tbody v-else-if="spesialis.length == 0">
                        <EmptyData />
                    </tbody>
                    <template v-else>
                        <tbody v-for="(data, index) in spesialis" :key="index">
                            <tr>
                                <td>
                                    {{ index + 1 }}
                                </td>
                                <td v-if="$can('action', 'Admin')"><input type="checkbox" :value="data.idPenyakit" v-model="selectedId"></td>
                                <td>{{ data.namaSpesialis }}</td>
                                <td>{{ data.icon }}</td>
                                <td v-if="$can('action', 'Admin')">
                                    <router-link :to="'spesialis_penyakit/' + data.idSpesialisPenyakit + '/edit'">
                                        <ButtonComponent Message="Edit" Color="btn-warning" />
                                    </router-link>
                                    <router-link :to="'spesialis_penyakit/' + data.idSpesialisPenyakit + '/dokter'">
                                        <ButtonComponent Icon="fa-eye" Message="Lihat dokter" Color="btn-info" />
                                    </router-link>
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
            <Form @submit="postSpesialis" :validation-schema="schema" v-slot="{ errors }">
                <div>
                    <Label>Jenis Spesialis</Label>
                    <InputField Name="namaSpesialis" v-model="form.nama_spesialis" />
                    <span class="text-danger">{{ errors.namaSpesialis }}</span>
                    <Label>Icon Spesialis</Label>
                    <InputField Name="namaSpesialis" v-model="form.icon" />
                    <span class="text-danger">{{ errors.icon }}</span>
                </div>
                <ButtonComponent />
            </Form>
        </template>
    </ModalComponent>
</template>

<script>
import ModalComponent from '@/components/partials-component/ModalComponent.vue'
import { Form } from 'vee-validate'
import InputField from '@/components/partials-component/InputField.vue'
import ButtonComponent from '@/components/partials-component/ButtonComponent.vue'
import iziToast from 'izitoast'
import * as valid from 'yup'
import EmptyData from '@/components/empty-table/EmptyData.vue'
import EmptyLoading from '@/components/empty-table/EmptyLoading.vue'
export default {
    data() {
        return {
            spesialis: [],
            form: {
                nama_spesialis: '',
                icon: ''
            },
            isLoading: false,
            selectedId: []
        }
    },
    created() {
        this.getSpesialis()
    },
    computed: {
        schema() {
            return valid.object({
                namaSpesialis: valid.string().required('wajib diisi')
            })
        }
    },
    methods: {
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
        goBack() {
            window.location = '/master/spesialis_penyakit'
        },
        postSpesialis() {
            let type = "postData"
            let url = [
                "master/penyakit/spesialis_penyakit", this.form
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.goBack()
            }).catch((err) => {
                console.log(err);
            })
        },
        deleteSpesialis() {
            if (this.selectedId == 0){
                return
            }
            let type = "deleteData"
            let urls = this.selectedId.map((idPenyakit)=>["master/penyakit/spesialis_penyakit", idPenyakit])
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
                        icon: 'question',
                        text: 'data berhasil dihapus'
                    })
                    this.getSpesialis()
                }
            })
            this.selectedId = []
        }
    },
    components: {
        ModalComponent, Form, InputField, ButtonComponent, EmptyData, EmptyLoading
    }
}
</script>