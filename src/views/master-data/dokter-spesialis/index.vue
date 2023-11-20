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
                            <th>Keahlian</th>
                            <!-- <th v-if="$can('action', 'Admin')">Aksi</th> -->
                        </tr>
                    </thead>
                    <tbody v-if="isLoading">
                        <EmptyLoading />
                    </tbody>
                    <tbody v-else-if="dokter.length == 0">
                        <EmptyData />
                    </tbody>
                    <template v-else>
                        <tbody v-for="(data, index) in dokter" :key="index">
                            <tr>
                                <td>
                                    {{ index + 1 }}
                                </td>
                                <td v-if="$can('action', 'Admin')"><input type="checkbox" :value="data.idMaster" v-model="selectedId"></td>
                                <td>{{ data.user.nama }}</td>
                                <td>{{ data.keahlianId.namaKeahlian }}</td>
                                <!-- <td v-if="$can('action', 'Admin')">
                                    <router-link :to="'spesialis_penyakit/' + data.idMaster + '/edit'">
                                        <ButtonComponent Message="Edit" Color="btn-warning" />
                                    </router-link>
                                    <router-link :to="'spesialis_penyakit/' + data.idMaster + '/dokter'">
                                        <ButtonComponent Icon="fa-eye" Message="Lihat dokter" Color="btn-info" />
                                    </router-link>
                                </td> -->
                            </tr>
                        </tbody>
                    </template>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
import EmptyLoading from '@/components/empty-table/EmptyLoading.vue'
import EmptyData from '@/components/empty-table/EmptyData.vue'
import ButtonComponent from '@/components/partials-component/ButtonComponent.vue'
export default {
    data(){
        return{
            dokter: [],
            selectedId: [],
            isLoading: false
        }
    },
    created(){
        this.getDokter()
    },
    methods: {
        getDokter(){
            let type = "getData"
            let url = [
                "master/spesialis/" + this.$route.params.idSpesialis + '/get_dokter', []
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result)=>{
                this.dokter = result.data
                this.isLoading = false
            }).catch((err)=>{
                console.log(err);
            })
        }
    },
    components: {
        ButtonComponent, EmptyLoading, EmptyData
    }
}
</script>