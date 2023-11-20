<template>
    <div class="col-sm-6 col-6">
        <div class="card shadow">
            <div class="card-header">
                <h6 class="font-weight-bold text-primary">{{ $route.name }}</h6>
            </div>
            <div class="card-body">
                <Form @submit="postKategori" :validation-schema="schema" v-slot="{ errors }">
                    <div>
                        <label>Kategori Produk</label>
                        <InputField Name="namaKategoriProduk" v-model="form.namaKategoriProduk" />
                        <span class="text-danger">{{errors.namaKategoriProduk}}</span>
                    </div>
                    <ButtonComponent />
                </Form>
            </div>
        </div>
    </div>
</template>
<script>
import * as valid from 'yup'
import ButtonComponent from '@/components/partials-component/ButtonComponent.vue'
import InputField from '../../../components/partials-component/InputField.vue'
import iziToast from 'izitoast'
import { Form } from 'vee-validate'
export default {
    data() {
        return {
            form: {
                namaKategoriProduk: ""
            }
        };
    },
    computed: {
        idFromParams() {
            return this.$route.params.id;
        },
        schema() {
            return valid.object({
                namaKategoriProduk: valid.string().required('wajib diisi')
            })
        }
    },
    created() {
        this.getKategoriProduk();
    },
    methods: {
        getKategoriProduk() {
            let type = "getData";
            let url = [
                "master/produk/kategori_produk/" + this.idFromParams + "/edit",
                {}
            ];
            this.$store.dispatch(type, url).then((result) => {
                this.form = result.data
            }).catch((err) => {
                console.log(err);
            });
        },
        postKategori() {
            let type = "updateData"
            let url = [
                "master/produk/kategori_produk", this.idFromParams, this.form
            ]
            this.$store.dispatch(type, url).then((result) => {
                iziToast.success({
                    title: 'success',
                    message: 'data berhasil diubah',
                    timeout: 1000,
                    position: 'topRight'
                })
                this.$router.back()
            }).catch((err) => {
                console.log(err);
            })
        }
    },
    components: { InputField, ButtonComponent, Form }
}
</script>