<template>
    <template v-if="token">
        <div id="wrapper">
            <SidebarComponents />
            <div id="content-wrapper" class="d-flex flex-column">
                <div id="content">
                    <HeaderComponents />
                    <div class="container-fluid">
                        <router-view></router-view>
                    </div>
                </div>
                <FooterComponents />
            </div>
        </div>
        <a class="scroll-to-top rounded" href="#page-top">
            <i class="fas fa-angle-up"></i>
        </a>
    </template>
    <template v-else>
        <router-view></router-view>
    </template>
</template>

<script>
import Cookies from 'js-cookie';
import SidebarComponents from '@/components/layouts/SidebarComponents.vue';
import HeaderComponents from '@/components/layouts/HeaderComponents.vue';
import FooterComponents from '@/components/layouts/FooterComponents.vue';

export default {
    data() {
        return {
            token: Cookies.get("token"),
            publicPath: import.meta.env.BASE_URL
        }
    },
    components: {
        SidebarComponents, HeaderComponents, FooterComponents
    }
}   
</script>