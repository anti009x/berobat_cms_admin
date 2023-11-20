<template>
    <div class="card shadow">
        <div class="card-header">
            <h6 class="font-weight-bold text-primary">
                {{ $route.params.id }}
                {{ $route.params.profilApotek }}
            </h6>
        </div>
        <div class="card-body">
            <label for="">Nama</label>
            <InputField Name="nama" v-model="form.namaProduk" />
            <label for="">Harga</label>
            <InputField Name="harga" v-model="form.hargaProduk" />
            <label for="">Deskripsi</label>
            <InputField Name="deskripsi" v-model="form.deskripsiProduk" />
            <ButtonComponent Message="submit" Color="btn-primary" @click="postProduk"/>
        </div>
    </div>
</template>
<script>
import ButtonComponent from '../../../components/partials-component/ButtonComponent.vue'
import InputField from '@/components/partials-component/InputField.vue'
export default {
    data() {
        return {
            form: {
                namaProduk: '',
                deskripsiProduk: '',
                hargaProduk: '',
                idProfilApotek: ''
            }
        }
    },
    computed: {
        idFromParams() {
            return this.$route.params.id
        },
        idProfilParams() {
            return this.$route.params.profilApotek
        }
    },
    created() {
        this.getDetailProduk()
    },
    methods: {
        getDetailProduk() {
            let type = "getData"
            let url = [
                "apotek/produk/data_produk/" + this.idFromParams + '/edit', {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.form = result.data
                console.log(result);
            }).catch((err) => {
                console.log(err);
            })
        },
        postProduk() {
            let type = "updateData"
            let url = [
                "apotek/produk/data_produk", this.idFromParams, {
                    namaProduk: this.form.namaProduk,
                    hargaProduk: this.form.hargaProduk,
                    deskripsiProduk: this.form.deskripsiProduk,
                    idProfilApotek: this.idProfilParams
                }, {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.$router.back()
            }).catch((err) => {
                console.log(err);
            })
        }
    },
    components: {
        InputField, ButtonComponent
    }
}
</script>