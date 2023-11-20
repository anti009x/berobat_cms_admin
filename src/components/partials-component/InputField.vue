<template>
    <Field :name="Name" :type="type" class="form-control border-primary mb-3" autocomplete="off" :value="value" />
</template>

<script>
import { Field } from 'vee-validate';
export default {
    components: {
        Field
    },
    props: {
        Label: {
            type: String,
            default: "Username"
        },
        type: {
            type: String,
            default: "text"
        },
        Name: {
            type: String,
            default: "belumDiisi"
        },
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