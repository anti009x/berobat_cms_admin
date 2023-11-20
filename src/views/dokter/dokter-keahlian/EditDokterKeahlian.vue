<template>
    <div class="card shadow">
        <div class="card-header">
            <h6 class="font-weight-bold text-primary">{{ $route.name }}</h6>
        </div>
        <div class="card-body">
            <Form @submit="postKeahlian">
                <!-- <div class="mb-3">
                    <SelectOption v-model="form.user_ahli_id" Label="Nama Dokter">
                        <template #option>
                            <option value="">pilih dokter</option>
                            <option :value="data.userId.id" v-for="data in limitedData" :key="index">{{
                                form.getDokter.nama }}
                            </option>
                        </template>
                    </SelectOption>
                </div> -->
                <input type="text" hidden :value="form.user.id">
                <div class="mb-3">
                    <SelectOption v-model="form.keahlianId" Label="Nama Keahlian">
                        <template #option>
                            <option value="">pilih keahlian</option>
                            <option :value="data.idKeahlian" v-for="data in keahlianDokter" :key="index">{{
                                data.namaKeahlian }}
                            </option>
                        </template>
                    </SelectOption>
                </div>
                <div>
                    <ButtonComponent />
                </div>
            </Form>
        </div>
    </div>
</template>
<script>
import ButtonComponent from '@/components/partials-component/ButtonComponent.vue'
import SelectOption from '@/components/partials-component/SelectOption.vue'
import iziToast from 'izitoast'
import { Form } from 'vee-validate'
import InputField from '@/components/partials-component/InputField.vue'
import ModalComponent from '@/components/partials-component/ModalComponent.vue'
export default {
    data() {
        return {
            dokterKeahlian: [],
            keahlianDokter: [],
            dokter: [],
            form: {
                user: {
                    id: ''
                },
                keahlianId: ''
            },
            limit: 1,
        }
    },
    computed: {
        idFromParams() {
            return this.$route.params.id
        },
        limitedData() {
            return this.dokter.slice(0, this.limit)
        }
    },
    created() {
        this.getKeahlianDokter(),
            this.getDokter(),
            this.getKeahlian()
    },
    methods: {
        getKeahlian() {
            let type = "getData"
            let url = [
                "master/keahlian", {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.keahlianDokter = result.data
            }).catch((err) => {
                console.log(err);
            })
        },
        getDokter() {
            let type = "getData";
            let url = [
                "akun/dokter",
                {}
            ];
            this.$store.dispatch(type, url).then((result) => {
                this.dokter = result.data
            }).catch((err) => {
                console.log(err);
            });
        },
        getKeahlianDokter() {
            let type = "getData"
            let url = [
                "master/ahli/keahlian/master/" + this.idFromParams + "/edit", {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.form = result.data
                console.log(result.data);
            }).catch((err) => {
                console.log(err);
            })
        },
        goBack() {
            window.location = '/dokter/dokter_keahlian'
        },
        deleteKeahlian(idDokterKeahlian) {
            let type = "deleteData"
            let url = [
                "master/dokter_keahlian", idDokterKeahlian
            ]
            this.$store.dispatch(type, url).then((result) => {
                iziToast.success({
                    title: 'success',
                    message: 'data berhasil dihapus',
                    timeout: 1000,
                    position: 'topRight'
                })
                this.getKeahlianDokter()
            }).catch((err) => {
                console.log(err);
            })
        },
        postKeahlian() {
            let type = "updateData"
            let url = [
                "master/ahli/keahlian/master", this.idFromParams, {
                    user_ahli_id: this.form.user.id,
                    keahlian_id: this.form.keahlianId
                }
            ]
            this.$store.dispatch(type, url).then((result) => {
                iziToast.success({
                    title: 'success',
                    message: 'data berhasil diubah',
                    timeout: 1000,
                    position: 'topRight'
                }),
                    this.$router.back()
            }).catch((err) => {
                console.log(err);
            })
        }
    },
    components: {
        ButtonComponent, ModalComponent, InputField, Form, SelectOption
    }
}
</script>