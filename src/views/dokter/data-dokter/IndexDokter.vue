<template>
    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Data {{ $route.name }}</h6>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th>no</th>
                            <th>Nama</th>
                            <th>Alamat</th>
                            <th>Email</th>
                            <th>Nomor STR</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody v-if="isLoading">
                        <tr>
                            <td colspan="12" class="text-center">
                                <LoadingIndicator />
                            </td>
                        </tr>
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
                                <td>{{ data.userId.nama }}</td>
                                <td>{{ data.userId.alamat }}</td>
                                <td>{{ data.userId.nomorHp }}</td>
                                <td>{{ data.nomorStr }}</td>
                                <td>
                                    <ButtonComponent Message="Detail" Color="btn-info" Icon="fa-eye"/>
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
import LoadingIndicator from '@/components/partials-component/LoadingIndicator.vue';
import EmptyData from '@/components/empty-table/EmptyData.vue'
import ButtonComponent from '@/components/partials-component/ButtonComponent.vue'
export default {
    data() {
        return {
            dokter: [],
            isLoading: false
        };
    },
    created() {
        this.getDokter()
    },
    methods: {
        getDokter() {
            let type = "getData";
            let url = [
                "akun/dokter/data",
                {}
            ];
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.dokter = result.data;
                this.isLoading = false
            }).catch((err) => {
                console.log(err);
            });
        },
    },
    components: { LoadingIndicator, EmptyData, ButtonComponent },
}
</script>
