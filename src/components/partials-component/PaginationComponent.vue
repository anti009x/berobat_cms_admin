<template>
    <nav aria-label="Page navigation example">
        <ul class="pagination">
            <li class="page-item ">
                <a @click="onPageChange(1)" class="page-link cursor " tabindex="-1">First</a>
            </li>
            <li class="page-item">
                <a class="page-link" @click="onPageChange(currentPage - 1)" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <li class="page-item active" aria-current="page">
                <a class="page-link">
                    {{ currentPage }}
                </a>
            </li>
            <li class="page-item " :class="{ disabled: lastPage == currentPage }">
                <a @click="onPageChange(currentPage + 1)" class="page-link" aria-label="Next"><span>&raquo;</span></a>
            </li>
            <li class="page-item" :class="{ disabled: lastPage == currentPage }">
                <a class="page-link" @click="onPageChange(lastPage)">Last</a>
            </li>
        </ul>
    </nav>
</template>
<script>
export default {
    props: ['rowsTotal', 'currentPage', 'lastPage'],

    methods: {
        onPageChange(page) {

            this.$emit('onPageChange', page);
        }
    },
}
</script>