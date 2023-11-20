<template>

</template>
<script>
export default {
    created() {
        this.getData()
    },
    methods: {
        getData(){
            const idJadwalPraktek = this.$route.params.idJadwalPraktek
            let type = "getData"
            let url = [
                `master/ahli/jadwal_praktek/${idJadwalPraktek}/edit`, {}
        ]
        this.$store.dispatch(type, url).then((result)=>{
            console.log(result);
        }).catch((err)=>{
            console.log(err);
        })
        }
    },
}
</script>