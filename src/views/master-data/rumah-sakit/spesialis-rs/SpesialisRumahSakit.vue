<template>
    <div class="card shadow">
        <div class="card-header">
            <div class="d-flex justify-content-between">
                <h6 class="m-0 font-weight-bold text-primary">Daftar Spesialis {{this.$route.params.namaRs}}</h6>
                <div class="d-flex justify-content-start" v-if="$can('action', 'Rumah Sakit')">
                    <div>
                        <ButtonComponent data-bs-toggle="modal" data-bs-target="#tambahData" Message="Tambah Data +" />
                        <div v-if="selected.length == 0">
                        </div>
                        <ButtonComponent Color="btn-danger" Icon="fa-trash" v-else-if="selected" Message="hapus"
                            @click="deleteData" />
                    </div>
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered" cellspacing="0">
                    <thead>
                        <th>no</th>
                        <th v-if="$can('action', 'Rumah Sakit')">Pilih</th>
                        <th>Nama</th>
                        <th>Aksi</th>
                    </thead>
                    <template v-if="isLoading">
                        <tbody>
                            <EmptyLoading />
                        </tbody>
                    </template>
                    <template v-else-if="dataSpesialis.length === 0">
                        <tbody>
                            <EmptyData />
                        </tbody>
                    </template>
                    <template v-else>
                        <tbody v-for="(data, index) in dataSpesialis" :key="index">
                            <tr>
                                <td>
                                    {{ index + 1 }}
                                </td>
                                <td v-if="$can('action', 'Rumah Sakit')">
                                    <input type="checkbox" v-model="selected" :value="data.idSpesialis">
                                </td>
                                <td>{{ data.penyakit ? data.penyakit.namaSpesialis : 'Data tidak ada' }}</td>
                                <td>
                                    <div class="d-flex">
                                        <template v-if="$can('action', 'Rumah Sakit')">
                                            <router-link
                                                :to="{name: 'Edit Spesialis Rumah Sakit', params: { idSpesialis: data.idSpesialis } }">
                                                <ButtonComponent Message="edit" Color="btn-warning" />
                                            </router-link>
                                        </template>
                                        <div v-if="data.penyakit">
                                            <router-link :to="{name: 'Dokter Spesialis Rs', params: {idSpesialis: data.penyakit.idSpesialisPenyakit, id: idFromParams, namaSpesialis:data.penyakit.namaSpesialis, namaRs: this.$route.params.namaRs}}">
                                                <ButtonComponent Color="btn-success" Icon="fa-eye" Message="lihat dokter" />
                                            </router-link>
                                        </div>
                                        <div v-else>
                                            <ButtonComponent Color="btn-success disabled" Message="+ dokter spesialis" />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </table>
            </div>
        </div>
    </div>
    <ModalComponent id="tambahData">
        <template #modal>
            <Form @submit="postSpesialis">
                <SelectOption Label="Spesialis" Width="w-100" v-model="form.id_penyakit">
                    <template #option>
                        <option value="">pilih spesialis</option>
                        <option :value="data.idSpesialisPenyakit" v-for="data in spesialisPenyakit">{{ data.namaSpesialis }}</option>
                    </template>
                </SelectOption>
                <ButtonComponent />
            </Form>
        </template>
    </ModalComponent>
</template>
<script>
import iziToast from 'izitoast'
import SelectOption from '@/components/partials-component/SelectOption.vue'
import { Form } from 'vee-validate'
import ModalComponent from '@/components/partials-component/ModalComponent.vue'
import ButtonComponent from '@/components/partials-component/ButtonComponent.vue'
import EmptyData from '@/components/empty-table/EmptyData.vue'
import EmptyLoading from '@/components/empty-table/EmptyLoading.vue'
export default {
    data() {
        return {
            dataSpesialis: [],
            spesialisPenyakit: [],
            selected: [],
            isLoading: false,
            form: {
                id_rumah_sakit: '',
                id_penyakit: ''
            }
        }
    },
    computed: {
        idFromParams() {
            return this.$route.params.idRumahSakit
        }
    },
    created() {
        this.getSpesialis(),
            this.getSpesialisPenyakit()
    },
    methods: {
        getSpesialis() {
            let type = "showData"
            let url = [
                "master/rumah_sakit/spesialis", this.idFromParams
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                console.log(result);
                this.isLoading = false
                this.dataSpesialis = result.data
            }).catch((err) => {
                console.log(err);
            })
        },
        postSpesialis() {
            const userId = this.idFromParams;
            console.log(userId);
            let type = 'postData';
            let url = [
                `master/rumah_sakit/spesialis/${userId}`,
                {
                    id_rumah_sakit: this.idFromParams,
                    id_penyakit: this.form.id_penyakit
                }
            ];
            this.$store.dispatch(type, url).then((result) => {
                iziToast.success({
                    title: 'success',
                    message: 'berhasil tambah data',
                    position: 'topRight'
                })
                this.getSpesialis()
            }).catch((err) => {
                console.log(err);
            });
        },
        getSpesialisPenyakit() {
            let type = "getData"
            let url = [
                "master/penyakit/spesialis_penyakit", {}
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.isLoading = false
                this.spesialisPenyakit = result.data
            }).catch((err) => {
                console.log(err);
            })
        },
        deleteData() {
            if (this.selected.length === 0) {
                return;
            }
            let type = "deleteData";
            let urls = this.selected.map((idSpesialis) => ["master/rumah_sakit/spesialis", idSpesialis]);
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
                    this.getSpesialis();
                }
            })
                .catch((err) => {
                    console.log(err);
                });
            this.selected = [];
        }
    },
    components: {
        EmptyData, EmptyLoading, ButtonComponent, Form, SelectOption, ModalComponent
    }
}
</script>