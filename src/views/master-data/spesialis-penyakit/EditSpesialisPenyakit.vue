<template>
    <div class="card shadow">
        <div class="card-header">
            <h6><b class="text-primary">{{ $route.name }}</b></h6>
        </div>
        <div class="card-body">
            <Form @submit="postSpesialis" :validation-schema="schema" v-slot="{errors}">
                <div>
                    <label for="">Nama Spesialis</label>
                    <InputField Name="namaSpesialis" v-model="form.namaSpesialis" />
                    <span class="text-danger">{{errors.namaSpesialis}}</span>
                    <Label>Icon Spesialis</Label>
                    <InputField Name="icon" v-model="form.icon" />
                    <span class="text-danger">{{ errors.icon }}</span>
                </div>
                <ButtonComponent />
            </Form>
        </div>
    </div>
</template>
<script>
import { Form } from 'vee-validate'
import * as valid from 'yup'
import ButtonComponent from '@/components/partials-component/ButtonComponent.vue'
import InputField from '@/components/partials-component/InputField.vue'
import iziToast from 'izitoast'
export default {
    data() {
        return {
            form: {
                namaSpesialis: '',
                icon: ''
            }
        }
    },
    computed: {
        idFromParams() {
            return this.$route.params.id
        },
        schema() {
            return valid.object({
                namaSpesialis: valid.string().required('wajib diisi')
            })
        }
    },
    created() {
        this.getSpesialis()
    },
    methods: {
        getSpesialis() {
            let type = "getData"
            let url = [
                "master/penyakit/spesialis_penyakit/" + this.idFromParams + '/edit', {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.form = result.data
                console.log(result);
            }).catch((err) => {
                console.log(err);
            })
        },
        postSpesialis() {
            let type = "updateData"
            let url = [
                "master/penyakit/spesialis_penyakit", this.idFromParams, this.form
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.$router.back()
                iziToast.success({
                    title: 'success',
                    message: 'data berhasil diubah',
                    position: 'topRight',
                    timeout: 1000
                })
            }).catch((err) => {
                console.log(err);
            })
        }
    },
    components: {
        InputField, Form, ButtonComponent
    }
}
</script>