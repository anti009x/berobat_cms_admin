<template>
    <div class="col-sm-6 col-6">
        <div class="card shadow">
            <div class="card-header">
                <h6><b class="text-primary">{{ $route.name }}</b></h6>
            </div>
            <div class="card-body">
                <Form @submit="submitEdit" :validation-schema="schema" v-slot="{ errors }">
                    <div>
                        <label for="">Nama Kategori</label>
                        <InputField Name="namaKategori" v-model="form.namaKategori" />
                        <span :class="[error]">{{ errors.namaKategori }}</span>
                    </div>
                    <div>
                        <ButtonComponent />
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>

<script>
import InputField from '@/components/partials-component/InputField.vue';
import ButtonComponent from '@/components/partials-component/ButtonComponent.vue';
import { Form } from 'vee-validate'
import iziToast from 'izitoast';
import * as validate from 'yup'
export default {
    data() {
        return {
            form: {
                namaKategori: ''
            },
            error: 'text-danger'
        }
    },
    computed: {
        idFromParams() {
            return this.$route.params.id
        },
        schema() {
            return validate.object({
                namaKategori: validate.string().required('wajib diisi')
            })
        }
    },
    created() {
        this.detailKategoriArtikel()
    },
    methods: {
        detailKategoriArtikel() {
            let type = "getData"
            let url = [
                "master/kategori_artikel/" + this.idFromParams + "/edit", []
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.form = result.data
            }).catch((err) => {
                console.log(err);
            })
        },
        goBack() {
            window.location = '/master/kategori_artikel'
        },
        submitEdit() {
            let type = "updateData"
            let url = [
                "master/kategori_artikel", this.idFromParams, this.form
            ]
            this.$store.dispatch(type, url).then((result) => {
                iziToast.success({
                    title: 'success',
                    message: 'Data Artikel Berhasil Diubah',
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
        Form
    }
}
</script>