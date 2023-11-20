<template>
    <InputField v-model="form.noKtp"/>
    <button @click="updateData">submit</button>
</template>
<script>
import InputField from '@/components/partials-component/InputField.vue'
export default {
    data(){
        return {
            form: {
                noKtp: ''
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
        updateData(){
            const idOwner = this.idFromParams
            let type = "putData"
            this.$store.dispatch(type, [`akun/active_account/${idOwner}/account` ,[], {
                nomor_ktp:this.form.noKtp
            }]).then((result)=>{
                this.$router.back()
            }).catch((err)=>{
                console.log(err);
            })
        }
    },
}
</script>