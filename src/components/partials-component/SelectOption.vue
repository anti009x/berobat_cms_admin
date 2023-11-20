<template>
    <label for="">{{ Label }}</label>
    <select :class="inputClasses" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)">
        <slot name="option"></slot>
    </select>
</template>
<script>
export default {
    props: {
        modelValue: {
            type: String,
            default: ''
        },
        Label: {
            type: String,
            default: 'Label'
        },
        Width: {
            type: String,
            default: 'w-25 '
        }
    },
    emits: ['update:modelValue'],
    computed: {
        inputClasses() {
            return ['form-select ', 'border-primary ', this.Width].join('')
        }
    }
}
</script>
<style>
select.form-select:focus {
    border-color: #3864db;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(95, 124, 218, 0.6);
}

select.form-select option {
    width: 200px;
    height: 1000px;
    max-height: 200px;
    overflow-y: auto;
}
</style>