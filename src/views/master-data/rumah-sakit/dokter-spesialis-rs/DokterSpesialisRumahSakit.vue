<template>
    <div class="card shadow">
        <div class="card-header">
            <h6 class="font-weight-bold text-primary">
                Dokter Spesialis {{ this.$route.params.namaSpesialis }} di {{ this.$route.params.namaRs }}
            </h6>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered" cellspacing="0">
                    <thead>
                        <th>
                            no
                        </th>
                        <th>
                            nama
                        </th>
                        <th>
                            keahlian
                        </th>
                        <th>
                            biaya praktek
                        </th>
                    </thead>
                    <tbody v-if="isLoading">
                        <EmptyLoading />
                    </tbody>
                    <tbody v-else-if="dokterSpesialis.length === 0">
                        <EmptyData />
                    </tbody>
                    <template v-else>
                        <tbody v-for="(data, index) in dokterSpesialis" :key="index">
                            <tr>
                                <td>
                                    {{ index + 1 }}
                                </td>
                                <td>
                                    {{ data.namaDokter }}
                                </td>
                                <td>
                                    {{ data.idKeahlian.namaKeahlian }}
                                </td>
                                <td>
                                    {{ data.biaya }}
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
import EmptyData from '@/components/empty-table/EmptyData.vue';
import EmptyLoading from '@/components/empty-table/EmptyLoading.vue';
export default {
    data() {
        return {
            dokterSpesialis: [],
            isLoading: false
        };
    },
    computed: {
        idFromParams() {
            return this.$route.params.id;
        },
        idDokterSpesialis() {
            return this.$route.params.idSpesialis;
        }
    },
    created() {
        this.getDokterSpesialis();
    },
    methods: {
        getDokterSpesialis() {
            const dokterSpesialis = this.idDokterSpesialis;
            const idRs = this.idFromParams;
            let type = "getData";
            let url = [
                `master/spesialis/${dokterSpesialis}/${idRs}`,
                {}
            ];
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.isLoading = false
                this.dokterSpesialis = result.data;
            }).catch((err) => {
                console.log(err);
            });
        }
    },
    components: {
        EmptyData,
        EmptyLoading
    },
};
</script>