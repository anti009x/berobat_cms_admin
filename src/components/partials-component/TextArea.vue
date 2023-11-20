<template>
    <textarea class="form-control" rows="3" :value="value"></textarea>
</template>

<script>
export default {
    props: {
        value: {
            type: String
        }
    },
}
</script>
<style>
  input.form-control:focus {
    border-color: #3864db;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(95, 124, 218, 0.6);
}
</style>