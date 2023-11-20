<template>
    <div class="container card shadow rounded pb-5">
        <h1 class="mt-5">{{ $route.name }}</h1>
        <div class="row">
            <div class="col-6 col-md-6">
                <div class="mb-3">
                    <label for="name" class="form-label">Full Name</label>
                    <InputField v-model="form.user.nama" Name="nama" />
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email Address</label>
                    <InputField v-model="form.user.email" Name="email" />
                </div>
                <div class="mb-3">
                    <label class="form-label">Nomor Hp</label>
                    <InputField v-model="form.user.nomorHp" Name="nomorHp" />
                </div>
                <ButtonComponent @click="updateData" />
            </div>
            <div class="col-6 col-md-6">
                <div class="mb-3">
                    <label class="form-label">Nomor STR</label>
                    <InputField v-model="form.nomorStr" Name="nomorStr" disabled />
                </div>
                <div class="mb-3">
                    <label class="form-label">Alamat</label>
                    <InputField v-model="form.user.alamat" Name="alamat" />
                </div>
                <div class="mb-3">
                    <label class="form-label">Biaya</label>
                    <InputField v-model="form.biaya" Name="biaya" />
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
                nomorStr: '',
                biaya: '',
                user: {
                    nama: '',
                    email: '',
                    nomorHp: '',
                    alamat: ''
                }
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
                "akun/profil/dokter/profil", {}
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
                "akun/profil/dokter/profil",
                {
                    nama: this.form.user.nama,
                    email: this.form.user.email,
                    nomorHp: this.form.user.nomorHp,
                    alamat: this.form.user.alamat,
                    biaya: this.form.biaya,
                    nomorStr: this.form.nomorStr,
                }, 
                {},
                {}
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
