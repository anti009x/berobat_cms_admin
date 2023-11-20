<template>
    <div class="container card shadow rounded pb-5">
        <h1 class="mt-5">{{$route.name}}</h1>
        <div class="row">
            <div class="col-6 col-md-6">
                <div class="mb-3">
                    <label for="name" class="form-label">Full Name</label>
                    <InputField v-model="form.nama" Name="nama" />
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email Address</label>
                    <InputField v-model="form.email" Name="email" />
                </div>
                <div class="mb-3">
                    <label class="form-label">Nomor Hp</label>
                    <InputField v-model="form.nomorHp" Name="nomorHp" />
                </div>
                <div class="mb-3">
                    <label class="form-label">Jenis Kelamin</label>
                    <select class="form-select border-primary" v-model="form.jenisKelamin">
                        <option value="L">Laki-laki</option>
                        <option value="P">Perempuan</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label class="form-label">Usia</label>
                    <InputField v-model="form.usia" Name="usia" />
                </div>
                <ButtonComponent @click="updateData"/>
            </div>
            <div class="col-6 col-md-6">
                <div class="mb-3">
                <label class="form-label">Alamat</label>
                <InputField v-model="form.alamat" Name="alamat" />
            </div>
            <div class="mb-3">
                <label class="form-label">Tempat Lahir</label>
                <InputField v-model="form.tempatLahir" Name="tempat" />
            </div>
            <div class="mb-3">
                <label class="form-label">Tanggal Lahir</label>
                <InputField v-model="form.tanggalLahir" type="date" Name="tanggal" />
            </div>
            <div class="mb-3">
                <label class="form-label">Tinggi Badan</label>
                <InputField v-model="form.tinggiBadan" Name="tinggi badan" />
            </div>
            <div class="mb-3">
                <label class="form-label">Berat Badan</label>
                <InputField v-model="form.beratBadan" Name="berat" />
            </div>
        </div>
        </div>
    </div>
</template>
<script>
import InputField from '@/components/partials-component/InputField.vue'
import ButtonComponent from '@/components/partials-component/ButtonComponent.vue'
export default {
    data() {
        return {
            form: {
                nama: '',
                email: '',
                nomorHp: '',
                usia: '',
                alamat: '',
                tempatLahir: '',
                tanggalLahir: '',
                tinggiBadan: '',
                beratBadan: '',
                jenisKelamin: ''
            }
        }
    },
    created() {
        this.getData()
    },
    methods: {
        getData() {
            let type = "getData"
            let url = [
                "akun/profil/admin/profil", {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.form = result.data
                console.log(result);
            }).catch((err) => {
                console.log(err);
            })
        },
        updateData() {
        let type = "putData"
            let url = [
                "akun/profil/admin/profil", this.form, {}, {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.getData()
                this.$swal({
                    icon: 'success',
                    title: 'Success',
                    text: 'berhasil ubah profil'
                })
            }).catch((err) => {
                console.log(err);
            })
        }
    },
    components: {
        ButtonComponent, InputField
    }
}
</script>