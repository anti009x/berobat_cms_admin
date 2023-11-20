<template>
    <div class="card shadow">
        <div class="card-header">
            <h6 class="m-0 font-weight-bold text-primary">Dokter Yang Belum Diaktifkan</h6>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered" width="100%" cellspacing="0">
                    <th>
                        no
                    </th>
                    <th>
                        Nama
                    </th>
                    <th>
                        Tempat Praktek
                    </th>
                    <th>
                        Aksi
                    </th>
                    <tbody v-if="isLoading">
                        <EmptyLoading/>
                    </tbody>
                    <tbody v-else-if="!dokter.length">
                        <EmptyData/>
                    </tbody>
                    <tbody v-for="(data, index) in dokter" :key="data.idPraktekAhli">
                        <tr>
                            <td>
                                {{ index + 1 }}
                            </td>
                            <td>
                                {{ data.ahli }}
                            </td>
                            <td>
                                {{ data.idRumahSakit.namaRs }}
                            </td>
                            <td>
                                <ButtonComponent Message="Aktifkan Akun"
                                    @click="lihat(data.idPraktekAhli, data.idRumahSakit.idRumahSakit)"
                                    data-bs-toggle="modal" data-bs-target="#tambahData" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <ModalComponent id="tambahData" modalTitle="Aktifkan Akun Dokter">
        <template #modal>
            <SelectOption Width="w-100 mb-2" Label="Keahlian" v-model="form.idKeahlian">
                <template #option>
                    <option value="">pilih keahlian</option>
                    <option :value="data.idKeahlian" v-for="data in keahlian">{{ data.namaKeahlian }}</option>
                </template>
            </SelectOption>
            <SelectOption Width="w-100 mb-2" Label="Spesialis" v-model="form.idSpesialis">
                <template #option>
                    <option value="">pilih spesialis</option>
                    <option :value="data.penyakit.idSpesialisPenyakit" v-for="data in spesialis">{{ data.penyakit.namaSpesialis }}
                    </option>
                </template>

            </SelectOption>
            <label for="">Biaya Praktek</label>
            <InputField v-model="form.biayaPraktek" />
            <ButtonComponent @click="postDokter" />
        </template>
    </ModalComponent>
</template>
<script>
import EmptyData from '@/components/empty-table/EmptyData.vue'
import EmptyLoading from '@/components/empty-table/EmptyLoading.vue'
import InputField from '../../../../components/partials-component/InputField.vue'
import SelectOption from '../../../../components/partials-component/SelectOption.vue'
import ModalComponent from '@/components/partials-component/ModalComponent.vue'
import ButtonComponent from '../../../../components/partials-component/ButtonComponent.vue'
export default {
    data() {
        return {
            dokter: [],
            keahlian: [],
            spesialis: [],
            idRs: {},
            idPraktekAhli: {},
            form: {
                idKeahlian: '',
                idSpesialis: '',
                biayaPraktek: ''
            },
            isLoading: false
        }
    },
    created() {
        this.getDokter()
    },
    methods: {
        postDokter() {
            let type = "putData"
            let url = [
                `akun/update_praktek_dokter/${this.idPraktekAhli}/update`, {
                    id_keahlian: this.form.idKeahlian,
                    id_spesialis: this.form.idSpesialis,
                    biaya_praktek: this.form.biayaPraktek
                }, {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                console.log(result);
            })
        },
        getKeahlian() {
            let type = "getData"
            let url = [
                `master/keahlian`, {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.keahlian = result.data
            }).catch((err) => {
                console.log(err);
            })
        },
        getDokter() {
            let type = "getData"
            let url = [
                "master/ahli/praktek/praktek_rs", {}
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.isLoading = false
                this.dokter = result.data
            }).catch((err) => {
                console.log(err);
            })
        },
        getSpesialis() {
            let type = "getData"
            let url = [
                `master/rumah_sakit/spesialis/${this.idRs}`, {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.spesialis = result.data
            }).catch((err) => {
                console.log(err);
            })
        },
        lihat(idSatu, idDua) {
            this.idPraktekAhli = idSatu
            this.idRs = idDua
            this.getSpesialis()
            this.getKeahlian()
        }
    },
    components: {
        ButtonComponent, ModalComponent, SelectOption, InputField, EmptyData, EmptyLoading
    }
}
</script>