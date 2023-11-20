<template>
    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <div class="d-flex justify-content-between">
                <h6 class="m-0 font-weight-bold text-primary">Data {{ $route.name }}</h6>
                <div class="d-flex justify-content-start">
                    <!-- <div v-if="$can('action', 'Rumah Sakit')">
                        <router-link to="/master/rumah_sakit/create">
                            <ButtonComponent Message="Tambah Data" Icon="fa-plus" />
                        </router-link>
                        <div v-if="selectedId.length === 0"></div>
                        <ButtonComponent v-else-if="selectedId" Icon="fa-trash" Color="btn-danger" Message="hapus" @click="deleteRumahSakit" />
                    </div> -->
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
                            <!-- <th v-if="$can('create', 'Rumah Sakit')">Pilih</th> -->
                            <th>Nama</th>
                            <th>Nomor Hp</th>
                            <th>Biaya Praktek</th>
                            <th>Praktek</th>
                        </tr>
                    </thead>
                    <tbody v-if="isLoading">
                        <EmptyLoading />
                    </tbody>
                    <tbody v-else-if="praktekDokter.length == 0">
                        <EmptyData />
                    </tbody>
                    <template v-else>
                        <tbody v-for="(data, index) in praktekDokter" :key="index">
                            <tr>
                                <td>
                                    {{ index + 1 }}
                                </td>
                                <!-- <td v-if="$can('create', 'Rumah Sakit')">
                                    <input type="checkbox" v-model="selectedId" :value="data.idRumahSakit">
                                </td> -->
                                <td>{{ data.ahli.nama }}</td>
                                <td>{{ data.ahli.nomorHp }}</td>
                                <td>{{ data.biayaPraktek }}</td>
                                <td v-if="$can('show', 'Rumah Sakit')">
                                    <router-link :to="{ name:'Detail Jadwal Praktek', params: {idRs: this.$route.params.idRs, idAhli: data.ahli.id, idPraktek: data.idDetailPraktek } }">
                                        <ButtonComponent Icon="fa-calendar" Color="btn-info" Message="lihat jadwal praktek"/>
                                    </router-link>
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
export default {
    data() {
        return {
            praktekDokter: [],
            isLoading: false,
            selectedId: []
        };
    },
    created() {
        this.getPraktek();
    },
    methods: {
        getPraktek() {
            const rsId = this.$route.params.idRs
            let type =  "getData"
            let url = [
                `master/ahli/detail_praktek/${rsId}`, {}
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result)=>{
                this.praktekDokter = result.data
                this.isLoading = false
            }).catch((err)=>{
                console.log(err);
            })
        },
    },
    components: {
        ButtonComponent,
        InputField,
        EmptyLoading,
        EmptyData
    }
}
</script>