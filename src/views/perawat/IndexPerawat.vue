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
                            <th>No</th>
                            <th>Nama</th>
                            <th>Email</th>
                            <th>Nomor Hp</th>
                            <th>Nomor STRP</th>
                            <th>aksi</th>
                        </tr>
                    </thead>
                    <tbody v-if="isLoading">
                        <EmptyLoading/>
                    </tbody>
                    <tbody v-else-if="perawat.length === 0">
                        <EmptyData/>
                    </tbody>
                    <template v-else>
                        <tbody v-for="(data, index) in perawat" :key="index">
                            <tr>
                                <td>
                                    {{ index + 1 }}
                                </td>
                                <td>
                                    {{data.user.nama}}
                                </td>
                                <td>{{data.user.email}}</td>
                                <td>{{data.user.nomorHp}}</td>
                                <td>{{data.nomorStrp}}</td>
                                <td>
                                    <!-- <a :href="data.fileDokumen" class="btn btn-sm btn-info" target="_blank">
                                        dokumen
                                    </a> -->
                                    <ButtonComponent Color="btn-info" Message="Detail" Icon="fa-eye"/>
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
import ActiveSlider from '../../components/partials-component/ActiveSlider.vue'
import SpanSlider from '../../components/partials-component/SpanSlider.vue'
import EmptyData from '../../components/empty-table/EmptyData.vue';
import EmptyLoading from '../../components/empty-table/EmptyLoading.vue';
export default {
    data() {
        return {
            perawat: [],
            status: 0,
            isLoading: false
        };
    },
    created() {
        this.getPerawat();
    },
    methods: {
        getPerawat() {
            let type = "getData";
            let url = [
                "akun/perawat",
                {}
            ];
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.isLoading = false
                this.perawat = result.data;
            }).catch((err) => {
                console.log(err);
            });
        },
        updateStatus(id_user, status) {
            if (status == 1){
                status = 0;
            } else {
                status = 1;
            }
            let type = "updateData";
            let url = [
                "akun/active_account",
                id_user,
                {
                    status: status,
                }
            ];
            this.$store.dispatch(type, url).then((result) => {
                console.log(result);
            }).catch((err) => {
                console.log(err);
            });
        }
    },
    components: { ActiveSlider, SpanSlider, EmptyData, EmptyLoading, ButtonComponent }
}
</script>