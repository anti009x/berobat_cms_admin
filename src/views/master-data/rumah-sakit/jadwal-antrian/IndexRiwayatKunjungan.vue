<template>
    <div class="card shadow">
        <div class="card-header py-3">
            <div class="d-flex justify-content-between">
                <h6 class="m-0 font-weight-bold text-primary">Data {{ $route.name }}</h6>
            </div>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama Pasien</th>
                            <th>Tempat</th>
                            <th>Tanggal</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody v-if="isLoading">
                        <EmptyLoading />
                    </tbody>
                    <tbody v-else-if="riwayat.length === 0">
                        <EmptyData Label="belum ada antrian pasien nihh" />
                    </tbody>
                    <template v-else>
                        <tbody v-for="(data, index) in riwayat" :key="index">
                            <tr>
                                <td>
                                    {{ index + 1 }}
                                </td>
                                <td>
                                    {{ data.konsumen.nama }}
                                </td>
                                <td>
                                    {{ data.detail.namaRs }}
                                </td>
                                <td>
                                    {{ data.tanggalTransaksi }}
                                </td>
                                <td>
                                    <ButtonComponent Message="Detail" data-bs-toggle="modal" data-bs-target="#detail" @click="lihat(data.idJadwalAntrian)"/>
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
import EmptyData from '@/components/empty-table/EmptyData.vue'
import EmptyLoading from '@/components/empty-table/EmptyLoading.vue'
import ButtonComponent from '@/components/partials-component/ButtonComponent.vue'
export default{
    data(){
        return{
            riwayat: [],
            isLoading: false,
        }
    },
    created() {
        this.getRiwayat()
    },
    methods: {
        getRiwayat(){
            let type = "getData"
            let url = [
                "ahli/transaksi_buat_janji", {}
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result)=>{
                this.isLoading = false
                this.riwayat = result.data
            }).catch((err)=>{
                console.log(er);
            })
        }
    },
    components:{
        EmptyData, EmptyLoading, ButtonComponent
    }
}
</script>