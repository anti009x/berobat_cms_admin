<template>
    <div class="card shadow">
        <div class="card-header">
            <h6 class="font-weight-bold text-primary">
                Data Diri
            </h6>
        </div>
        <Form @submit="updateProfile">
            <div class="card-body">
                <div class="row">
                    <div class="col-sm-6 col-6">
                        <label for="">Nama</label>
                        <InputField Name="nama" class="w-75" v-model="form.user.nama" />
                        <SelectOption Label="Jenis Kelamin" Width="w-75" v-model="form.user.jenisKelamin">
                            <template #option>
                                <option value="">pilih jenis kelamin</option>
                                <option value="P">Perempuan</option>
                                <option value="L">Laki-Laki</option>
                            </template>
                        </SelectOption>
                        <label for="" class="mt-3">Tinggi Badan</label>
                        <InputField Name="tinggi" class="w-75" v-model="form.user.tinggiBadan" />
                        <label for="">Usia</label>
                        <InputField Name="usia" class="w-75" v-model="form.user.usia" />
                        <label for="">Kelas</label>
                        <InputField Name="kelas" class="w-75" />
                        <label for="">NIP</label>
                        <InputField Name="nip" class="w-75" />
                    </div>
                    <div class="col-sm-6 col-6">
                        <label for="">Email</label>
                        <InputField Name="email" class="w-75" v-model="form.user.email" />
                        <label for="">Alamat</label>
                        <InputField Name="alamat" class="w-75" v-model="form.user.alamat" />
                        <label for="">Berat badan</label>
                        <InputField Name="berat" class="w-75" v-model="form.user.beratBadan" />
                        <label for="">Tempat Lahir</label>
                        <InputField Name="tempat" class="w-75" v-model="form.user.tempatLahir" />
                        <label for="">Tanggal Lahir</label>
                        <InputField Name="tanggal" class="w-75" type="date" v-model="form.user.tanggalLahir" />
                        <label for="">Nomor STR</label>
                        <InputField Name="nomor_str" class="w-75" />
                    </div>
                </div>
            </div>
            <div class="card-footer">
                <ButtonComponent />
            </div>
        </Form>
    </div>
</template>
<script>
import InputField from '../../components/partials-component/InputField.vue';
import SelectOption from '../../components/partials-component/SelectOption.vue';
import ButtonComponent from '../../components/partials-component/ButtonComponent.vue';
import Cookies from 'js-cookie'
import { Form } from 'vee-validate'
export default {
    data(){
        return {
            form: {
                idDokter: '',
                user: {
                    nama: '',
                    email: '',
                    alamat: '',
                    jenisKelamin: '',
                    tempatLahir: '',
                    tanggalLahir: '',
                    beratBadan: '',
                    tinggiBadan: '',
                    usia: ''
                }
            }   
        }
    },
    mounted(){
        this.getProfile()
    },
    components: {
        InputField,
        SelectOption, ButtonComponent, Form
    },
    methods: {
        getProfile(){
            const user = JSON.parse(Cookies.get('user'))
            const cekRole = user.data.getRole.idRole
            let type = "getData"
            let url = null
            if(cekRole === "RO-2003061"){
                url = [
                    "akun/profil/admin/profil", {}
                ]
            } else if (cekRole === "RO-2003062"){
                url = [
                    "akun/profil/dokter/profil", {}
                ]
            } else if (cekRole === "RO-2003065"){
                url = [
                    "akun/profil/apotek/profil"
                ]
            }
            this.$store.dispatch(type, url).then((result)=>{
                this.form = result.data
                this.form.idDokter = result.data
            }).catch((err)=>{
                console.log(err);
            })
        },
        updateProfile(){
            let type = "updateData"
            let url = [
                "akun/profil/dokter/profil", this.form.idDokter, this.form.user   
            ]
            this.$store.dispatch(type, url).then((result)=>{
                console.log(result);
            }).catch((err)=>{
                console.log(err);
            })
        }
    }
}
</script>