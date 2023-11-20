<template>
<div class="col-sm-6 col-6">
    <div class="card shadow">
        <div class="card-header">
            <div>
                <h6 class="font-weight-bold text-primary">{{ $route.name }}</h6>
            </div>
        </div>
        <div class="card-body">
            <Form @submit="postFasilitas">
                <div>
                    <label for="">Nama Fasilitas</label>
                    <InputField v-model="form.namaFasilitas" />
                </div>
                <div class="mb-3">
                    <SelectOption Width="w-100" v-model="form.idRumahSakit" Label="Rumah Sakit">
                        <template #option>
                            <option value="">Pilih nama rumah sakit</option>
                            <option :value="form.rumahSakit.idRumahSakit">
                                {{form.rumahSakit.namaRs}}</option>
                        </template>
                    </SelectOption>
                </div>
                <ButtonComponent />
            </Form>
        </div>
    </div>
</div>
</template>
<script>
import InputField from '@/components/partials-component/InputField.vue'
import ButtonComponent from '@/components/partials-component/ButtonComponent.vue'
import { Form } from 'vee-validate'
import iziToast from 'izitoast'
import SelectOption from '@/components/partials-component/SelectOption.vue'
export default {
    data() {
        return {
            dataRumahSakit: [],
            form: {
                namaFasilitas: '',
                idRumahSakit: '',
                rumahSakit: {
                    namaRs: '',
                    idRumahSakit: ''
                }
            },
            limit: 1
        }
    },
    computed: {
        idFromParams() {
            return this.$route.params.id
        },
    },
    created() {
        this.getFasilitas(),
            this.getRumahSakit()
    },
    methods: {
        getFasilitas() {
            let type = "getData"
            let url = [
                "master/rumah_sakit/fasilitas_rs/" + this.idFromParams + '/edit', {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.form = result.data
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
                this.dataRumahSakit = result.data
            }).catch((err) => {
                console.log(err);
            })
        },
        postFasilitas() {
            let type = "updateData"
            let url = [
                "master/rumah_sakit/fasilitas_rs", this.idFromParams, this.form
            ]
            this.$store.dispatch(type, url).then((result) => {
                iziToast.success({
                    title: 'success',
                    message: 'berhasil data diubah',
                    position: 'topRight',
                    timeout: 1000
                })
                this.$router.back()
            }).catch((err) => {
                console.log(err);
            })
        }
    },
    components: {
    InputField,
    ButtonComponent,
    Form,
    SelectOption
}
}
</script>
<style>
select.form-select:focus {
    border-color: #3864db;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(95, 124, 218, 0.6);
}

select.form-select option {
    width: 200px;
    height: 1000px;
}
</style>