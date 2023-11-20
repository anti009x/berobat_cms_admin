<template>
    <div :id="id" class="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
        <div class="bg-white py-2 collapse-inner rounded">
            <h6 class="collapse-header">{{ title }}</h6>
            <slot name="router"></slot>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        id: {
            type: String,
            default: 'collapseUtilities'
        },
        header: {
            type: String,
            default: "header"
        }, 
        title: {
            type: String,
            default: "ha"
        }
    }
}
</script>