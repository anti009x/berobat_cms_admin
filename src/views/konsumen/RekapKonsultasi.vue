<template>
    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Data {{$route.name}}</h6>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th>no</th>
                            <th> Member</th>
                            <th> Dokter</th>
                            <th>Biaya</th>
                            <th>Status</th>
                            <th>Tanggal</th>
                        </tr>
                    </thead>
                    <tbody v-if="isLoading">
                        <EmptyLoading/>
                    </tbody>
                    <tbody v-else-if="riwayat.length === 0">
                        <EmptyData/>
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
                                    {{ data.ahli.nama }}
                                </td>
                                <td>
                                    {{ data.transaksi.biaya }}
                                </td>
                                <td>
                                    {{data.transaksi.status}}
                                </td>
                                <td>
                                    {{ data.transaksi.tanggal }}
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
import ActiveSlider from '../../components/partials-component/ActiveSlider.vue'
import SpanSlider from '../../components/partials-component/SpanSlider.vue'
import EmptyData from '../../components/empty-table/EmptyData.vue';
import EmptyLoading from '../../components/empty-table/EmptyLoading.vue';
export default {
    data() {
        return {
            riwayat: [],
            isLoading: false
        };
    },
    created() {
        this.getRiwayat();
    },
    methods: {
        getRiwayat(){
            let type = "getData"
            let url = [
                "transaksi/konsultasi", {}, {}
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result)=>{
                this.isLoading = false
                this.riwayat = result.data
                console.log(result);
            }).catch((err)=>{
                console.log(err);
            })
        },
    },
    components: { ActiveSlider, SpanSlider, EmptyData, EmptyLoading }
}
</script>