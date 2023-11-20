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
                            <th>Nama</th>
                            <th>NIK</th>
                            <th>Nomor HP</th>
                            <th>Alamat</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody v-if="isLoading">
                        <EmptyLoading/>
                    </tbody>
                    <tbody v-else-if="konsumen.length === 0">
                        <EmptyData/>
                    </tbody>
                    <template v-else>
                        <tbody v-for="(data, index) in konsumen" :key="index">
                            <tr>
                                <td>
                                    {{ index + 1 }}
                                </td>
                                <td>{{data.user.nama}}</td>
                                <td>{{data.nik}}</td>
                                <td>{{data.user.nomorHp}}</td>
                                <td>{{data.user.email}}</td>
                                <td>{{data.user.email}}</td>
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
            konsumen: [],
            status: 0,
            isLoading: false
        };
    },
    created() {
        this.getKonsumen();
    },
    methods: {
        getKonsumen() {
            let type = "getData";
            let url = [
                "akun/konsumen",
                {}
            ];
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.isLoading = false
                this.konsumen = result.data;
            }).catch((err) => {
                console.log(err);
            });
        },
    },
    components: { ActiveSlider, SpanSlider, EmptyData, EmptyLoading }
}
</script>