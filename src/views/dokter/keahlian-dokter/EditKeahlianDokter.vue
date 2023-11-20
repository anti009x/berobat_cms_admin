<template>
    <div class="card shadow">
        <div class="card-header">
            <h6 class="font-weight-bold text-primary">
                {{ $route.name }}
            </h6>
        </div>
        <div class="card-body">
            <Form @submit="postKeahlian" :validation-schema="schema" v-slot="{ errors }">
                <div>
                    <label for="">Nama Keahlian</label>
                    <InputField Name="namaKeahlian" v-model="form.namaKeahlian" />
                    <span class="text-danger">{{errors.namaKeahlian}}</span>
                </div>
                <div>
                    <ButtonComponent />
                </div>
            </Form>
        </div>
    </div>
</template>
<script>
import InputField from '@/components/partials-component/InputField.vue';
import { Form } from 'vee-validate'
import * as valid from 'yup'
import ButtonComponent from '@/components/partials-component/ButtonComponent.vue'
import iziToast from 'izitoast';
export default {
    data() {
        return {
            form: {
                namaKeahlian: ''
            }
        }
    },
    components: {
        InputField, Form, ButtonComponent
    },
    computed: {
        idFromParams() {
            return this.$route.params.id
        },
        schema() {
            return valid.object({
                namaKeahlian: valid.string().required('wajib diisi')
            })
        }
    },
    created() {
        this.getKeahlian()
    },
    methods: {
        getKeahlian() {
            let type = "getData"
            let url = [
                "master/keahlian/" + this.idFromParams + '/edit', {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.form = result.data
            }).catch((err) => {
                console.log(err);
            })
        },
        postKeahlian() {
            let type = "updateData"
            let url = [
                "master/keahlian", this.idFromParams, this.form
            ]
            this.$store.dispatch(type, url).then((result) => {
                iziToast.success({
                    title: 'success',
                    message: 'data berhasil diubah',
                    position: 'topRight',
                    timeout: 1000
                })
                this.$router.back()
            }).catch((err) => {
                console.log(err);
            })
        }
    },
}
</script>