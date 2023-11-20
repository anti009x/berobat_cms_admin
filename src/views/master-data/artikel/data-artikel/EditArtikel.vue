<template>
    <div class="card shadow rounded">
        <div class="card-header">
            <h6><b class="text-primary">{{ $route.name }}</b></h6>
        </div>
        <div class="card-body">
            <Form @submit="submitEdit" :validation-schema="schema" v-slot="{ errors }">
                <div class="w-25">
                    <label for="">Pilih Foto</label>
                    <input type="file" class="form-control" @change="chooseFoto">
                    <img :src="form.foto" class="img-fluid mt-3" alt="">
                </div>
                <div>
                    <label for="">Judul Artikel</label>
                    <InputField class="w-25" Name="judulArtikel" v-model="form.judulArtikel" />
                    <span>{{ errors.judulArtikel }}</span>
                </div>
                <div>
                    <label for="">Deskripsi Artikel</label>
                    <textarea class="form-control border-primary" v-model="form.deskripsi" cols="30" rows="10"></textarea>
                </div>
                <div class="d-flex justify-content-between">
                    <ButtonComponent class="mt-3" />
                </div>
            </Form>
        </div>
    </div>
</template>

<script>
import InputField from '@/components/partials-component/InputField.vue';
import iziToast from 'izitoast'
import { Form, Field } from 'vee-validate'
import ButtonComponent from '@/components/partials-component/ButtonComponent.vue';
import TextArea from '@/components/partials-component/TextArea.vue';
import * as valid from 'yup'
export default {
    data() {
        return {
            form: {
                judulArtikel: '',
                deskripsi: '',
                foto: null,
                gambarLama: ''
            }
        }
    },
    computed: {
        idFromParams() {
            return this.$route.params.id
        },
        schema() {
            let message = 'wajib diisi'
            return valid.object({
                judulArtikel: valid.string().required(message)
            })
        },
        formData() {
            const formData = new FormData()

            formData.append('foto', this.form.foto)
            formData.append('judul_artikel', this.form.judulArtikel)
            formData.append('deskripsi', this.form.deskripsi)
            formData.append('gambarLama', this.form.gambarLama)

            return formData;
        },
    },
    components: {
        InputField,
        Form,
        Field,
        ButtonComponent,
        TextArea
    },
    created() {
        this.detailArtikel()
    },
    methods: {
        detailArtikel() {
            let type = "getData"
            let url = [
                "master/artikel/" + this.idFromParams + "/edit", {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.form = result.data
            }).catch((err) => {
                console.log(err);
            })
        },
        submitEdit() {
            const params = this.$route.params.id
            const allowedFormats = ['image/jpeg', 'image/png', 'image/jpg'];
            const file = this.form.foto;
            const maxSizeInBytes = 5 * 1024 * 1024;
            if (file && allowedFormats.includes(file.type)) {
                if (file.size <= maxSizeInBytes) {
                    this.$store
                        .dispatch("postDataUpload", [`master/artikel/${params}?_method=put`, this.formData])
                        .then((result) => {
                            iziToast.success({
                                title: 'Success',
                                position: 'topRight',
                                message: 'Data Artikel Berhasil Ditambahkan',
                                timeout: 1000
                            });
                            this.$router.back()
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                } else {
                    iziToast.error({
                        title: 'Error',
                        message: 'Maaf, ukuran file gambar terlalu besar. Maksimum ukuran file adalah 5MB.',
                        position: 'topRight'
                    });
                }
            } else {
                iziToast.error({
                    title: 'Error',
                    message: 'Maaf, format yang diperbolehkan hanya jpg, png, jpeg',
                    position: 'topRight'
                });

            }
        },
        chooseFoto(event) {
            this.form.foto = event.target.files[0]
        }
    },
}
</script>