<template>
    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Data {{ $route.name }}</h6>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered" width="100%" cellspacing="0">
                    <th>Nama</th>
                    <th>Akun</th>
                    <th>Foto</th>
                    <th>Dokumen</th>
                    <th>Aksi</th>
                    <tbody v-if="isLoading">
                        <EmptyLoading />
                    </tbody>
                    <tbody v-else-if="!akun.length">
                        <EmptyData/>
                    </tbody>
                    <template v-else v-for="(data, index) in akun" :key="index">
                        <tbody v-if="data.role.idRole === 'RO-2003066'">
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
                                    <ButtonComponent Message="Aktifkan Akun"
                                        @click="simpanAkun(data.id)" />
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
            <label for="">Nomor Apotek</label>
            <InputField v-model="form.nomor_strp" />
            <ButtonComponent class="mt-3" @click="simpanAkun" />
        </template>
    </ModalComponent>
</template>
<script>
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
            idUser: {},
            form: {
                nomor_strp: '',
            },
            isLoading: false
        }
    },
    components: {
        ButtonComponent, ModalComponent, InputField, SelectOption, EmptyData, EmptyLoading
    },
    created() {
        this.getAkun()
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
        simpanAkun(idUser) {
            let type = "putData";
            let url = [
                `akun/active_account/${idUser}/account`, {}
            ];
            this.$store.dispatch(type, url).then((result) => {
                this.$swal({
                    icon: 'success',
                    title: 'berhasil aktifkan akun'
                })
                this.getAkun()
            }).catch((err) => {
                console.log(err);
            })
        }
    },
}
</script>