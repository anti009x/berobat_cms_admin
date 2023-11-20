<template>
    <div class="card shadow">
        <div class="card-header">
            <h6 class="font-weight-bold text-primary">{{$route.name}}</h6>
        </div>
        <div class="card-body">
            <Form @submit="postGroup">
                <SelectOption Label="Produk" v-model="form.kodeProduk">
                    <template #option>
                        <option value="">pilih produk</option>
                        <option :value="data.kodeProduk" v-for="data in dataProduk">{{data.namaProduk}}</option>
                    </template>
                </SelectOption>
                <br>
                <SelectOption Label="Kategori Produk" v-model="form.idKategoriProduk">
                    <template #option>
                        <option value="">pilih kategori produk</option>
                        <option :value="data.idKategoriProduk" v-for="data in dataKategoriProduk">{{data.namaKategoriProduk}}</option>
                    </template>
                </SelectOption>
                <br>
                <ButtonComponent/>
            </Form>
        </div>
    </div>
    {{ dataEdit }}
</template>
<script>
import { Form } from 'vee-validate';
import SelectOption from '@/components/partials-component/SelectOption.vue';
import ButtonComponent from '@/components/partials-component/ButtonComponent.vue';
import iziToast from 'izitoast';
export default {
    data() {
        return {
            dataEdit: [],
            dataProduk: [],
            dataKategoriProduk: [],
            form: {
                idKategoriProduk: '',
                kodeProduk: '',
            },
            selected: [],
            isLoading: false
        };
    },
    computed: {
        idFromParams(){
            return this.$route.params.id
        }
    },
    created() {
        this.getProdukApotek(),
        this.getKategoriProduk(),
        this.detailGrouping()
    },
    methods: {
        getKategoriProduk() {
            let type = "getData"
            let url = [
                "master/produk/kategori_produk", {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.dataKategoriProduk = result.data
            }).catch((err) => {
                console.log(err);
            })
        },
        postGroup() {
            let type = "updateData"
            let url = [
                "apotek/produk/produk_kategori", this.idFromParams, this.form
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
        },
        getProdukApotek() {
            let type = "getData"
            let url = [
                "apotek/produk/data_produk", {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.dataProduk = result.data
            }).catch((err) => {
                console.log(err);
            })
        },
        detailGrouping(){
            let type = "getData"
            let url = [
                "apotek/produk/produk_kategori/" + this.idFromParams + "/edit", {}
            ]
            this.$store.dispatch(type, url).then((result)=>{
                this.dataEdit = result.data
                console.log(result);
            }).catch((err)=>{
                console.log(err);
            })
        }
    },
    components: {
        SelectOption, ButtonComponent, Form
    }
};
</script>