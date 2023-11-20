<template>
    <div class="col-lg-6 col-md-6">
        <div class="card shadow mb-4">
            <div class="card-header">
                <h6><b class="text-primary">{{ $route.name }}</b></h6>
            </div>
            <div class="card-body">
                <Form @submit="postGroupArtikel">
                    <SelectOption Width="w-100" v-model="form.idArtikel" Label="Judul Artikel">
                        <template #option>
                            <option value="">pilih judul artikel</option>
                            <option :value="data.idArtikel" v-for="data in dataArtikel" :key="index">{{
                                data.judulArtikel }}
                            </option>
                        </template>
                    </SelectOption>
                    <br>
                    <SelectOption Width="w-100" Label="Kategori Artikel" v-model="form.idKategoriArtikel">
                        <template #option>
                            <option value="">pilih kategori artikel</option>
                            <option :value="data.idKategoriArtikel" v-for="data in dataKategoriArtikel" :key="index">{{
                                data.namaKategori }}
                            </option>
                        </template>
                    </SelectOption>
                    <br>
                    <div class="d-flex justify-content-between">
                        <ButtonComponent/>
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>

<script>
import { Form } from 'vee-validate'
import ButtonComponent from '@/components/partials-component/ButtonComponent.vue'
import SelectOption from '@/components/partials-component/SelectOption.vue'
import iziToast from 'izitoast'
import EmptyLoading from '@/components/empty-table/EmptyLoading.vue'
export default {
    data() {
        return {
            dataArtikel: [],
            dataKategoriArtikel: [],
            form: {
                idArtikel: '',
                idKategoriArtikel: ''
            },
            limit: 1
        }
    },
    computed: {
        idFromParams() {
            return this.$route.params.id
        },
        limitedData(){
            return this.dataArtikel.slice(0, this.limit)
        }
    },
    created() {
        this.detailGrouping(),
            this.getArtikel(),
            this.getKategoriArtikel()
    },
    methods: {
        detailGrouping() {
            let type = "getData"
            let url = [
                "master/grouping_artikel/" + this.idFromParams + '/edit', {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.dataArtikel = result.data
                console.log(result);
            }).catch((err) => {
                console.log(err);
            })
        },
        postGroupArtikel() {
            let type = "updateData"
            let url = [
                "master/grouping_artikel", this.idFromParams, this.form
            ]
            this.$store.dispatch(type, url).then((result) => {
                iziToast.success({
                    title: 'success',
                    message: 'data berhasil diubah',
                    timeout: 1000,
                    position: 'topRight',
                })
                this.$router.back()
            }).catch((err) => {
                console.log(err);
            })
        },
        getArtikel() {
            let type = "getData"
            let url = [
                "master/artikel", {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.dataArtikel = result.data
            }).catch((err) => {
                console.log(err);
            })
        },
        getKategoriArtikel() {
            let type = "getData"
            let url = [
                "master/kategori_artikel", {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.dataKategoriArtikel = result.data
            }).catch((err) => {
                console.log(err);
            })
        },
        goBack() {
            window.location = "/master/grouping_artikel"
        }
    },
    components: {
        ButtonComponent,
        Form,
        SelectOption,
        EmptyLoading
    }

}
</script>