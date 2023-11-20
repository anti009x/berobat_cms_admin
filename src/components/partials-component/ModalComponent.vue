<template>
    <div class="modal fade" :id="id" tabindex="-1" :aria-labelledby="labelBy" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">{{modalTitle}}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <slot name="modal"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    props: {
        id: {
            type: String,
            default: 'exampleModal'
        },
        labelBy: {
            type: String,
            default: 'exampleModalLabel'
        },
        modalTitle: {
            type: String,
            default: 'belum ada'
        }
    }
}
</script>