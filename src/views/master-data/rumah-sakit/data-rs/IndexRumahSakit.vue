<template>
    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <div class="d-flex justify-content-between">
                <h6 class="m-0 font-weight-bold text-primary">Data {{ $route.name }}</h6>
                <div class="d-flex justify-content-start">
                    <div v-if="$can('action', 'Rumah Sakit')">
                        <router-link to="/master/rumah_sakit/create">
                            <ButtonComponent Message="Tambah Data" Icon="fa-plus" />
                        </router-link>
                        <div v-if="selectedId.length === 0"></div>
                        <ButtonComponent v-else-if="selectedId" Icon="fa-trash" Color="btn-danger" Message="hapus" @click="deleteRumahSakit" />
                    </div>
                    <!-- <ButtonComponent Message="Download Rekap RS" Icon="fa-download"/> -->
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th>no</th>
                            <th v-if="$can('action', 'Rumah Sakit')">Pilih</th>
                            <th>Nama</th>
                            <th>Alamat</th>
                            <th>Praktek</th>
                            <th v-if="$can('show', 'Rumah Sakit')">Aksi</th>
                        </tr>
                    </thead>
                    <tbody v-if="isLoading">
                        <EmptyLoading />
                    </tbody>
                    <tbody v-else-if="rumahSakit.length == 0">
                        <EmptyData />
                    </tbody>
                    <template v-else>
                        <tbody v-for="(data, index) in rumahSakit" :key="index">
                            <tr>
                                <td>
                                    {{ index + 1 }}
                                </td>
                                <td v-if="$can('action', 'Rumah Sakit')">
                                    <input type="checkbox" v-model="selectedId" :value="data.idRumahSakit">
                                </td>
                                <td>{{ data.namaRs }}</td>
                                <td>{{ data.alamatRs }}</td>
                                <td>
                                    <router-link :to="{ name: 'Daftar Dokter', params: { idRs: data.idRumahSakit } }">
                                        <ButtonComponent Color="btn-info" Message="jadwal" Icon="fa-eye"/>
                                      </router-link>                                      
                                </td>
                                <td v-if="$can('show', 'Rumah Sakit')">
                                    <div class="d-flex">
                                        <router-link v-if="$can('action', 'Rumah Sakit')" :to="{ name: 'Edit Rumah Sakit', params: { id: data.idRumahSakit } }">
                                            <ButtonComponent Message="edit rs" Color="btn-warning" />
                                        </router-link>
                                        <router-link :to="'fasilitas_rs/' + data.idRumahSakit + '/show'">
                                            <ButtonComponent Color="btn-secondary" Message="fasilitas" Icon="fa-eye" />
                                        </router-link>
                                        <router-link :to="{name: 'Spesialis Rumah Sakit', params: {idRumahSakit: data.idRumahSakit, namaRs: data.namaRs}}">
                                        <ButtonComponent Color="btn-success" Message="spesialis" Icon="fa-eye"/> 
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
</template>

<script>
import ButtonComponent from '@/components/partials-component/ButtonComponent.vue'
import InputField from '@/components/partials-component/InputField.vue'
import EmptyLoading from '@/components/empty-table/EmptyLoading.vue'
import EmptyData from '@/components/empty-table/EmptyData.vue'
import iziToast from 'izitoast'
import Cookies from 'js-cookie'
export default {
    data() {
        return {
            rumahSakit: [],
            isLoading: false,
            selectedId: []
        };
    },
    created() {
        this.getRumahSakit();
        this.getDokter()
    },
    methods: {
        getRumahSakit() {
            const parsing = JSON.parse(Cookies.get('user'));
            const userId = parsing.data.id;
            const cekRole = parsing.data.getRole.idRole;
            const type = "getData";
            let url = null;
            if(cekRole === "RO-2003061"){
                url = [
                    "master/rumah_sakit/data", {}
                ]
            } else if (cekRole === "RO-2003066"){
                url = [`master/rumah_sakit/data/${userId}`, {}];
            }
            this.isLoading = true;
            this.$store.dispatch(type, url)
                .then((result) => {
                    this.rumahSakit = result.data;
                    this.isLoading = false;
                    console.log(result.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        deleteRumahSakit() {
            if (this.rumahSakit.length === 0){
                return;
            }
            let type = "deleteData"
            let urls = this.rumahSakit.map((idRumahSakit)=> ["master/rumah_sakit/data", idRumahSakit]) 
            this.$swal({
                icon: 'question',
                title: 'Apakah kamu ingin menghapus data?',
                showDenyButton: true,
                confirmButtonText: false,
                confirmButtonText: 'Ya, hapus',
                denyButtonText: 'jangan hapus'
            }).then((result)=>{
                if(result.isConfirmed){
                    Promise.all(urls.map((url)=>this.$store.dispatch(type, url)))
                    this.$swal({
                        icon: 'success',
                        text: 'data berhasil dihapus'
                    })
                this.getRumahSakit()
                }
            }).catch((err)=>{
                console.log(err);
            })
        },
        getDokter(){
            let type = "getData"
            let url = [
                "master/ahli/praktek/praktek_rs", {}
            ]
            this.$store.dispatch(type, url).then((result)=>{
                console.log(result);
            }).catch((err)=>{
                console.log(err);
            })
        }
    },
    components: {
        ButtonComponent,
        InputField,
        EmptyLoading,
        EmptyData
    }
}
</script>