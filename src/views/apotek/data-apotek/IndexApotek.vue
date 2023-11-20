<template>
    <div class="card shadow">
        <div class="card-header py-3">
            <div class="d-flex justify-content-between">
                <h6 class="m-0 font-weight-bold text-primary">Data {{ $route.name }}</h6>
                <div class="d-flex justify-content-start">
                    <router-link to="apotek/create" v-if="$can('action', 'Owner')">
                        <ButtonComponent Color="btn-dark" Message="Tambah Data +" />
                    </router-link>
                    <div v-if="selected.length == 0">
                    </div>
                    <ButtonComponent Color="btn-danger" v-else-if="selected" Message="hapus" @click="deleteData" />
                </div>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-bordered" cellspacing="0">
                        <thead>
                            <th>no</th>
                            <th v-if="$can('action', 'Owner')">
                                pilih
                            </th>
                            <th>nama</th>
                            <th v-if="$can('action', 'Admin')">pemilik</th>
                            <th v-if="$can('action', 'Owner')">status</th>
                            <th v-if="$can('action', 'Owner Admin')">aksi</th>
                        </thead>
                        <tbody v-if="isLoading">
                            <EmptyLoading />
                        </tbody>
                        <tbody v-else-if="dataApotek.length === 0">
                            <EmptyData />
                        </tbody>
                        <template v-else>
                            <tbody v-for="(data, index) in dataApotek" :key="index">
                                <tr>
                                    <td>
                                        {{ index + 1 }}
                                    </td>
                                    <td v-if="$can('action', 'Owner')">
                                        <input type="checkbox" v-model="selected" :value="data.idProfilApotek">
                                    </td>
                                    <td>{{ data.namaApotek }} </td>
                                    <td v-if="$can('action', 'Admin')">{{ data.user.nama }}</td>
                                    <td v-if="$can('action', 'Owner')">
                                        <ActiveSlider :checked="data.status == 1">
                                            <template #span>
                                                <SpanSlider @click="updateStatus(data.idProfilApotek, data.status)" />
                                            </template>
                                        </ActiveSlider>
                                    </td>
                                    <td class="d-flex justify-content-center">
                                        <!-- <template> -->
                                            <div v-if="data.status === 0">
                                                <ButtonComponent disabled Message="lihat produk" Color="btn-warning" />
                                            </div>
                                            <div v-else>
                                                <router-link
                                                    :to="{ name: 'Produk Apotek', params: { id: data.idProfilApotek } }">
                                                    <ButtonComponent Message="lihat produk" Color="btn-warning" />
                                                </router-link>
                                            </div>
                                        <!-- </template> -->
                                        <router-link v-if="$can('action', 'Owner')" :to="{ name: 'Edit Apotek', params: { id: data.idProfilApotek } }">
                                            <ButtonComponent Message="edit apotek" Color="btn-warning" />
                                        </router-link>
                                    </td>
                                </tr>
                            </tbody>
                        </template>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Form } from 'vee-validate';
import ActiveSlider from '@/components/partials-component/ActiveSlider.vue';
import SpanSlider from '@/components/partials-component/SpanSlider.vue'
import InputField from '@/components/partials-component/InputField.vue';
import ButtonComponent from '@/components/partials-component/ButtonComponent.vue';
import EmptyData from '@/components/empty-table/EmptyData.vue'
import EmptyLoading from '@/components/empty-table/EmptyLoading.vue'
export default {
    data() {
        return {
            dataApotek: [],
            status: 0,
            selected: [],
            isLoading: false
        }
    },
    created() {
        this.getDataApotek()
    },
    methods: {
        getDataApotek() {
            let type = "getData"
            let url = [
                "apotek/pengaturan/profil_apotek", {}
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.isLoading = false
                this.dataApotek = result.data
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
                "apotek/pengaturan/profil_apotek/ubah_status",
                id_user,
                {
                    status: status,
                }
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.getDataApotek()
            }).catch((err) => {
                console.log(err);
            })
        },
        deleteData() {
            if (this.selected.length === 0) {
                return;
            }
            let type = "deleteData";
            let urls = this.selected.map((idProfilApotek) => ["apotek/pengaturan/profil_apotek", idProfilApotek]);
            this.$swal({
                icon: 'question',
                title: "Apakah kamu ingin menyimpan perubahan",
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: "Ya, Hapus",
                denyButtonText: "Jangan Hapus"
            }).then((results) => {
                if (results.isConfirmed) {
                    Promise.all(urls.map((url) => this.$store.dispatch(type, url)))
                    this.$swal({
                        icon: 'success',
                        text: 'data berhasil dihapus'
                    })
                    this.getDataApotek();
                }
            })
                .catch((err) => {
                    console.log(err);
                });
            this.selected = [];
        }
    },
    components: { SpanSlider, ActiveSlider, InputField, ButtonComponent, Form, EmptyData, EmptyLoading }

}
</script>