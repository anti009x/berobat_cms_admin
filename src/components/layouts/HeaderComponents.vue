<template>
    <div>
        <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

            <!-- Sidebar Toggle (Topbar) -->
            <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
                <i class="fa fa-bars"></i>
            </button>

            <!-- Topbar Search -->
            <form class="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                <div class="input-group">
                    <input type="text" class="form-control bg-light border-0 small" placeholder="Search for..."
                        aria-label="Search" aria-describedby="basic-addon2">
                    <div class="input-group-append">
                        <button class="btn btn-primary" type="button">
                            <i class="fas fa-search fa-sm"></i>
                        </button>
                    </div>
                </div>
            </form>

            <!-- Topbar Navbar -->
            <ul class="navbar-nav ml-auto">

                <!-- Nav Item - Search Dropdown (Visible Only XS) -->
                <li class="nav-item dropdown no-arrow d-sm-none">
                    <a class="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        <i class="fas fa-search fa-fw"></i>
                    </a>
                    <!-- Dropdown - Messages -->
                    <div class="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                        aria-labelledby="searchDropdown">
                        <form class="form-inline mr-auto w-100 navbar-search">
                            <div class="input-group">
                                <input type="text" class="form-control bg-light border-0 small" placeholder="Search for..."
                                    aria-label="Search" aria-describedby="basic-addon2">
                                <div class="input-group-append">
                                    <button class="btn btn-primary" type="button">
                                        <i class="fas fa-search fa-sm"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </li>

                <!-- Nav Item - Alerts -->
               

                <!-- Nav Item - Messages -->
                

                <div class="topbar-divider d-none d-sm-block"></div>

                <!-- Nav Item - User Information -->
                <li class="nav-item dropdown no-arrow">
                    <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        <span v-if="form.nama" class="mr-2 d-none d-lg-inline text-gray-600 small">{{ form.nama }}</span>
                        <span v-else-if="form.user"
                            class="mr-2 d-none d-lg-inline text-gray-600 small">{{ form.user.nama }}</span>
                        <img class="img-profile rounded-circle" src="">
                    </a>
                    <!-- Dropdown - User Information -->
                    <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                        <router-link :to="{ name: 'Update Profile Admin' }" class="dropdown-item" v-if="$can('action', 'Admin')">
                            <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                            Profile Admin
                        </router-link>
                        <router-link :to="{ name: 'Update Profile Apotek' }" class="dropdown-item" v-if="$can('action', 'Owner')">
                            <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                            Profile Owner Apt
                        </router-link>
                        <router-link :to="{ name: 'Update Profile Owner Rs' }" class="dropdown-item" v-if="$can('action', 'Rumah Sakit')">
                            <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                            Profile Owner Rs
                        </router-link>
                        <router-link :to="{ name: 'Update Profile Dokter' }" class="dropdown-item" v-if="$can('action', 'Dokter')">
                            <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                            Profile Dokter
                        </router-link>
                        <router-link :to="{ name: 'Update Profile Perawat' }" class="dropdown-item" v-if="$can('action', 'Perawat')">
                            <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                            Profile Perawat
                        </router-link>
                        <router-link to="/change_password" class="dropdown-item">
                            <i class="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                            Settings
                        </router-link>
                        <a class="dropdown-item" href="#">
                            <i class="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                            Activity Log
                        </a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                            <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                            Logout
                        </a>
                    </div>
                </li>

            </ul>

        </nav>
    </div>
    <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                    <button class="btn btn-primary" @click="logout">Logout</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
    data() {
        return {
            form: []
        }
    },
    methods: {
        logout() {
            let type = "getData"
            let url = [
                "logout", {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                Cookies.remove('token')
                Cookies.remove('user')
                window.location.replace('/login')
            }).catch((err) => {
                console.log(err);
            })
        }
    },
    mounted() {
        this.getData()
    },
    methods: {
        getData() {
            const cookie = Cookies.get("user");
            const parsing = JSON.parse(cookie);
            const cekRole = parsing.data.getRole.idRole;

            let type = "getData"
            let url = null;

            if (cekRole === "RO-2003061") {
                url = [
                    "akun/profil/admin/profil", []
                ]
            } else if (cekRole === "RO-2003062") {
                url = [
                    "akun/profil/dokter/profil", []
                ]
            } else if (cekRole === "RO-2003065") {
                url = [
                    "akun/profil/apotek/profil", []
                ]
            }
            this.$store.dispatch(type, url).then((result) => {
                this.form = result.data
            }).catch((err) => {
                console.log(err);
            })
        },
        logout() {
            let type = "getData"
            let url = [
                "logout", {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                Cookies.remove('token')
                Cookies.remove('user')
                window.location = '/login'
            }).catch((err) => {
                console.log(err);
            })
        }
    },
}
</script>