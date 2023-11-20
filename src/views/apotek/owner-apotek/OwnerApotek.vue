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
                            <th>No</th>
                            <th>Nama</th>
                            <th>Alamat</th>
                            <th>Email</th>
                            <th>Nomor Hp</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody v-if="isLoading">
                        <EmptyLoading />
                    </tbody>
                    <tbody v-else-if="ownerApotek.length === 0">
                        <EmptyData />
                    </tbody>
                    <template v-else>
                        <tbody v-for="(data, index) in ownerApotek" :key="index">
                            <tr>
                                <td>
                                    {{ index + 1 }}
                                </td>
                                <td>
                                    {{ data.getUser.nama }}
                                </td>
                                <td>
                                    {{ data.getUser.alamat }}
                                </td>
                                <td>
                                    {{ data.getUser.email }}
                                </td>
                                <td>
                                    {{ data.getUser.nomorHp }}
                                </td>
                                <td>
                                    <div class="d-flex justify-content-start">
                                        <!-- <router-link :to="'owner_apotek/' + data.getUser.id
                                            "> -->
                                        <ButtonComponent Message="Aktifkan akun" Color="btn-warning"
                                            @click="aktifkan(data.getUser.id)" />
                                        <a href="" class="btn btn-sm btn-icon-split me-2 rounded btn-info" target="_blank">
                                            <span class="icon text-white-50">
                                                <i class="fas fa-eye"></i>
                                            </span>
                                            <span class="text">
                                                dokumen
                                            </span>
                                        </a>
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
import LoadingIndicator from '@/components/partials-component/LoadingIndicator.vue'
import ActiveSlider from '@/components/partials-component/ActiveSlider.vue'
import SpanSlider from '@/components/partials-component/SpanSlider.vue'
import EmptyLoading from '@/components/empty-table/EmptyLoading.vue';
import EmptyData from '@/components/empty-table/EmptyData.vue';
export default {
    data() {
        return {
            ownerApotek: [],
            isLoading: false,
            status: 0
        }
    },
    created() {
        this.getOwnerApotek()
    },
    methods: {
        getOwnerApotek() {
            let type = "getData"
            let url = [
                "akun/apotek", {}
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.ownerApotek = result.data
                this.isLoading = false
            }).catch((err) => {
                console.log(err);
            })
        },
        updateStatus(id_user, status) {
            if (status == 1) {
                status == 0
            } else {
                status == 1
            }
            let type = "updateData"
            let url = [
                "akun/active_account",
                id_user,
                {
                    status: status,
                }
            ]
            this.$store.dispatch(type, url).then((result) => {
                console.log(result);
            }).catch((err) => {
                console.log(err);
            })
        },
        aktifkan(id) {
            let type = "putData";
            let url = [`akun/active_account/${id}/account`, {}];
            this.$swal({
                icon: 'question',
                title: 'Aktifkan akun sekarang?',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: "Ya, aktifkan",
                denyButtonText: "Jangan"
            }).then((result) => {
                if (result.isConfirmed) { // Check if the user clicked the "confirm" button
                    this.$store.dispatch(type, url).then((result) => {
                        this.getOwnerApotek()
                    }).catch((err) => {
                        console.log(err);
                    });
                }
            });
        }

    },
    components: {
        ButtonComponent,
        LoadingIndicator,
        ActiveSlider,
        SpanSlider,
        EmptyData,
        EmptyLoading
    }
}
</script>