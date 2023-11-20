<template>
    <h6 class="collapse-header">{{ title }}</h6>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: "kosong"
        }
    }
}
</script>