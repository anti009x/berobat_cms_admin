<template>
    <Form @submit="postSpesialisRS">
        <SelectOption v-model="form.idSpesialis">
            <template #option>
                <option value="">pilih nama spesialis</option>
                <option :value="data.idSpesialisPenyakit" v-for="data in spesialisPenyakit">{{ data.namaSpesialis }}</option>
            </template>
        </SelectOption>
        <ButtonComponent />
    </Form>
    {{ idFromSpesialis }}
</template>
<script>
import iziToast from 'izitoast'
import { Form } from 'vee-validate'
import SelectOption from '@/components/partials-component/SelectOption.vue'
import ButtonComponent from '@/components/partials-component/ButtonComponent.vue'
export default {
    data() {
        return {
            editSPRS: [],
            spesialisPenyakit: [],
            form: {
                idSpesialis: ''
            }
        }
    },
    computed: {
        idFromParams() {
            return this.$route.params.id
        },
        idFromSpesialis() {
            return this.$route.params.idSpesialis
        },
    },
    created() {
        this.getData(),
            this.getSpesialisPenyakit()
    },
    methods: {
        getData() {
            const idSpesialis = this.$route.params.idSpesialis
            let type = "getData"
            let url = [
                `master/rumah_sakit/spesialis/${idSpesialis}/edit`, {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                console.log(result.data);
                this.editSPRS = result.data
            }).catch((err) => {
                console.log(err);
            })
        },
        getSpesialisPenyakit() {
            let type = "getData"
            let url = [
                "master/penyakit/spesialis_penyakit", {}
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.isLoading = false
                this.spesialisPenyakit = result.data
            }).catch((err) => {
                console.log(err);
            })
        },
        postSpesialisRS() {
            const id = this.$route.params.idSpesialis
            console.log(id);
            let type = "updateData"
            let url = [
                `master/rumah_sakit/spesialis/${id}`, {
                    id_penyakit: this.form.idSpesialis
                }, {}
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                iziToast.success({
                    title: 'success',
                    message: 'berhasil ubah data',
                    position: 'topRight'
                })
            }).catch((err) => {
                console.log(err);
            })
        }
    },
    components: {
        SelectOption, Form, ButtonComponent
    }
}
</script>