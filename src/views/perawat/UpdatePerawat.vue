<template>
    <label for="">Update Nomor STRP</label>
    <InputField v-model="form.nomorStrp" class="w-50" />
    <button @click="updateData" class="btn btn-sm btn-primary">submit</button>
</template>
<script>
import InputField from '@/components/partials-component/InputField.vue'
export default {
    data() {
        return {
            form: {
                nomorStrp: ''
            }
        }
    },
    computed: {
        idFromParams() {
            return this.$route.params.id
        }
    },
    components: {
        InputField
    },
    methods: {
        updateData() {
            const pesan = "akun kamu berhasil diaktifkan";
            const nomorHp = "6281214707143";
            const idPerawat = this.idFromParams;
            let type = "putData";
            let url = [
                `akun/active_account/${idPerawat}/account`,
                {
                    nomor_strp: this.form.nomorStrp,
                },
                {},
            ];

            this.$store
                .dispatch(type, url)
                .then((result) => {
                    this.$swal({
                        icon: 'success',
                        title: 'berhasil menyimpan data',
                    }).then(() => {
                        // Construct the WhatsApp message URL
                        const waUrl = `https://wa.me/${nomorHp}?text=${encodeURIComponent(pesan)}`;

                        // Open the WhatsApp message URL in a new window
                        window.open(waUrl);
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }

    },
}
</script>