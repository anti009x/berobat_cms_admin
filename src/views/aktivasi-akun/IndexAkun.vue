<template>
    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Data {{ $route.name }}</h6>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered" width="100%" cellspacing="0">
                    <thead>
                        <th>Nama</th>
                        <th>Akun</th>
                        <th>Foto</th>
                        <th>Dokumen</th>
                        <th>Aksi</th>
                    </thead>
                    <tbody v-if="isLoading">
                        <EmptyLoading />
                    </tbody>
                    <template v-else v-for="(data, index) in akun" :key="index">
                        <tbody v-if="data.role.idRole === 'RO-2003062'">
                            <tr>
                                <td>{{ data.nama }}</td>
                                <td>{{ data.role.namaRole }}</td>
                                <td>
                                    <a :href="data.foto" target="_blank" class="btn btn-sm btn-info">
                                        lihat foto
                                    </a>
                                </td>
                                <td>
                                    <a :href="data.fileDokumen" target="_blank" class="btn btn-sm btn-success">
                                        lihat dokumen
                                    </a>
                                </td>
                                <td>
                                    <ButtonComponent data-bs-toggle="modal" data-bs-target="#tambahData" Message="Aktifkan Akun"
                                        @click="lihat(data.id)" />
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </table>
            </div>
        </div>
    </div>
    <ModalComponent id="tambahData">
        <template #modal>
            <label for="">Nomor STR</label>
            <InputField v-model="form.nomor_str" />
            <selectOption Width="w-100 mb-3" Label="Kategori Dokter" v-model="form.is_dokter_rs">
                <template #option>
                    <option value="">pilih kategori dokter</option>
                    <option value="1">terikat rumah sakit</option>
                    <option value="2">tidak terikat rumah sakit</option>
                </template>
            </selectOption>
            <selectOption Width="w-100" v-if="form.is_dokter_rs === '1'" Label="Praktek di Rumah Sakit"
                v-model="form.id_rumah_sakit">
                <template #option>
                    <option value="">pilih tempat praktek</option>
                    <option :value="data.idRumahSakit" v-for="data in rumahSakit">
                        {{ data.namaRs }}
                    </option>
                </template>
            </selectOption>
            <ButtonComponent class="mt-3" @click="simpanAkun" />
        </template>
    </ModalComponent>
</template>
<script>
import Pagination from '@/components/partials-component/PaginationComponent.vue'
import EmptyLoading from '@/components/empty-table/EmptyLoading.vue'
import EmptyData from '@/components/empty-table/EmptyData.vue'
import SelectOption from '@/components/partials-component/SelectOption.vue'
import InputField from '@/components/partials-component/InputField.vue'
import ModalComponent from '@/components/partials-component/ModalComponent.vue'
import ButtonComponent from '@/components/partials-component/ButtonComponent.vue'
export default {
    data() {
        return {
            akun: [],
            rumahSakit: [],
            idUser: {},
            form: {
                nomor_str: '',
                is_dokter_rs: '',
                id_rumah_sakit: ''
            },
            isLoading: false
        }
    },
    components: {
        ButtonComponent, ModalComponent, InputField, SelectOption, EmptyData, EmptyLoading
    },
    created() {
        this.getAkun(),
            this.getRumahSakit()
    },
    methods: {
        getAkun() {
            let type = "getData"
            let url = [
                "akun/data_register", {}
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.akun = result.data
                this.isLoading = false
            }).catch((err) => {
                console.log(err);
            })
        },
        lihat(id) {
            this.idUser = id
        },
        simpanAkun() {
            let type = "putData";
            let url = [
                `akun/active_account/${this.idUser}/account`, {
                    id_rumah_sakit: this.form.id_rumah_sakit,
                    is_dokter_rs: this.form.is_dokter_rs,
                    nomor_str: this.form.nomor_str
                }
            ];
            this.$store.dispatch(type, url).then((result) => {
                console.log(result);
            }).catch((err) => {
                console.log(err);
            })
        },
        getRumahSakit() {
            let type = "getData"
            let url = [
                "master/rumah_sakit/data", {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.rumahSakit = result.data
            }).catch((err) => {
                console.log(err);
            })
        },
        onPageChange(page) {
            this.pagination.page = page;
            this.getAkun();
        },
    },
}
</script>