<template>
    <div class="card shadow">
        <div class="card-header">
            <h6 class="font-weight-bold text-primary">{{ $route.name }}</h6>
        </div>
        <div class="card-body">
            <Form @submit="postOwner">
                <div class="row">
                    <div class="col-sm-6 col-6">
                        <div>
                            <label for="">Nama</label>
                            <InputField Name="nama" v-model="form.user.nama" />
                        </div>
                        <div>
                            <label for="">Email</label>
                            <InputField Name="email" v-model="form.user.email" />
                        </div>
                        <div>
                            <label for="">Alamat</label>
                            <InputField Name="alamat" v-model="form.user.alamat" />
                        </div>
                    </div>
                    <div class="col-sm 6 col-6">
                        <div>
                            <label for="">Nomor HP</label>
                            <InputField Name="nomorHp" v-model="form.user.nomorHp" />
                        </div>
                        <div>
                            <label for="">Nama</label>
                            <InputField Name="noKtp" v-model="form.noKtp" />
                        </div>
                    </div>
                </div>
                <ButtonComponent/>
            </Form>
        </div>
    </div>
</template>
<script>
import InputField from '@/components/partials-component/InputField.vue';
import { Form } from 'vee-validate';
import * as valid from 'yup'
import ButtonComponent from '@/components/partials-component/ButtonComponent.vue';

export default {
    data() {
        return {
            form: {
                user: {
                    nama: '',
                    email: '',
                    alamat: '',
                    nomorHp: '',
                },
                noKtp: ''
            }
        };
    },
    computed: {
        idFromParams() {
            return this.$route.params.id;
        }
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            let type = "getData";
            let url = [
                "akun/owner_rs/" + this.idFromParams + "/edit",
                {}
            ];
            this.$store.dispatch(type, url).then((result) => {
                this.form = result.data;
            }).catch((err) => {
                console.log(err);
            });
        },
        postOwner(){
            let type = "updateData"
            this.form.user.noKtp = this.form.noKtp
            let url = [
                "akun/owner_rs", this.idFromParams, this.form.user,
            ]
            this.$store.dispatch(type, url).then((result)=>{
                console.log(result);
            }).catch((err)=>{
                console.log(err);
            })
        }
    },
    components: { InputField, Form, ButtonComponent }
}
</script>