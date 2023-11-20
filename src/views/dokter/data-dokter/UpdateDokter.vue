<template>
    <label for="">Kategori Dokter</label>
    <select name="" id="" class="w-50 mb-2 form-select" v-model="form.isDokter">
        <option value="">pilih kategori dokter</option>
        <option value="1">terikat rs</option>
        <option value="2">tidak terikat rs</option>
    </select>
    <label for="">Update Nomor STR</label>
    <div></div>
    <InputField v-model="form.nomorStr" class="w-50"/>
    <button @click="update" class="btn btn-sm btn-primary">submit</button>
</template>
<script>
import InputField from '@/components/partials-component/InputField.vue'
export default {
    data(){
        return {
            form: {
                nomorStr: '',
                isDokter: ''
            }
        }
    },
    computed: {
        idFromParams(){
            return this.$route.params.id
        }
    },
    components: {
        InputField
    },
    methods: {
        update(){            
            const idDokter = this.idFromParams
            let type = "putData"
            let url = [
                `akun/active_account/${idDokter}/account`, {
                    nomor_str: this.form.nomorStr,
                    is_dokter_rs: this.form.isDokter
                }, {}
            ]
            this.$store.dispatch(type, url).then((result)=>{
                this.$swal({
                    icon:'success',
                    title: 'berhasil menyimpan data'
                })
            }).catch((err)=>{
                console.log(err);
            })
        }
    },
}
</script>