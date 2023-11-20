<template>
    <tr>
        <td colspan="12" class="text-center">
            <div class="alert alert-info w-100">
                <strong><i>
                    {{ Label }}
                </i></strong>
            </div>
        </td>
    </tr>
</template>
<script>
export default {
    props: {
        Label: {
            type: String,
            default: 'Data Tidak Ada'
        }
    }
}
</script>