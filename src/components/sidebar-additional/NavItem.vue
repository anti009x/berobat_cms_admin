<template>
    <li class="nav-item">
        <a class="nav-link collapsed" href="#" data-toggle="collapse" :data-target="target"
            aria-expanded="true" aria-controls="collapseUtilities">
            <i :class="'fa-solid ' + icon"></i>
            <span>{{span}}</span>
        </a>
        <slot name="item"></slot>
    </li>
</template>

<script>
export default {
    props: {
        target: {
            type: String,
            default: '#collapseUtilities'
        },
        span: {
            type: String,
            default: "Belum Ada"
        },
        icon :{
            type: String,
            default: "fa-briefcase"
        }
    }
}
</script>