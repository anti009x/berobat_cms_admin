<template>
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">{{ $route.name }}</h1>
        <a href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                class="fas fa-download fa-sm text-white-50"></i> Generate Report</a>
    </div>
    <div class="row" v-for="count in datas" :key="index">
        <div class="col-xl-3 col-md-6 mb-4">
            <LoadingIndicator v-if="isLoading" />
            <div class="card border-left-primary shadow h-100 py-2" v-if="!isLoading">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                Jumlah Dokter</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ count.dokter }}</div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-user-doctor fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-md-6 mb-4">
        <LoadingIndicator v-if="isLoading" />
            <div class="card border-left-success shadow h-100 py-2" v-if="!isLoading">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                                Jumlah Perawat</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ count.perawat }}</div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-user-nurse fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-md-6 mb-4">
            <LoadingIndicator v-if="isLoading" />
            <div class="card border-left-info shadow h-100 py-2" v-if="!isLoading">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-info text-uppercase mb-1">Jumlah Rumah Sakit
                            </div>
                            <div class="row no-gutters align-items-center">
                                <div class="col-auto">
                                    <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">{{ count.rumahSakit }}</div>
                                </div>
                                <div class="col">
                                    <div class="progress progress-sm mr-2">
                                        <div class="progress-bar bg-info" role="progressbar" style="width: 50%"
                                            aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-users fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-md-6 mb-4">
            <LoadingIndicator v-if="isLoading" />
            <div class="card border-left-warning shadow h-100 py-2" v-if="!isLoading">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                Jumlah Apotek</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ count.apotek }}</div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-store fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row" v-if="$can('action', 'Admin Apotek')">
        <div class="col-md-6 col-6">
            <template v-if="plotting.length > 0">
                <div class="card shadow-lg rounded mb-3" v-for="data in plotting">
                    <div class="card-body">
                        <h5 class="text-primary"><b>Hai, Ada pesanann masuk nihhh</b></h5>
                        <hr>
                        <h5><b>Detail Dokter</b></h5>
                        <p>Rekomendasi: Dokter {{ data.rekomendasi.nama }} <br>
                            Nomor Telepon: {{ data.rekomendasi.nomorHp }}
                        </p>
                        <hr style="font-weight: bold;">
                        <h5><b>Detail Resep Obat</b></h5>
                        <p>Produk: {{ data.produk.nama }} <br>
                            Harga: {{ data.produk.harga }} <br>
                            Jumlah: {{ data.jumlahButuh }} <br>
                            Tanggal Resep: {{ data.tanggal }}
                        </p>
                        <hr style="font-weight: bold;">
                        <div class="d-flex justify-content-end">
                            <button class="btn btn-sm btn-success me-3">
                                <i class="fas fa-check"></i>
                                Proses Resep
                            </button>
                        </div>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="alert alert-danger text-center">
                    <p>
                        Belum ada pesanan yang masuk
                    </p>
                </div>
            </template>
        </div>
        <!-- <div class="col-md-6 col-6">
            <div class="card border-left-warning shadow py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                Jumlah Resep Masuk</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">20</div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-store fa-2x text-gray-300"></i>
                        </div>
                        <div class="d-flex justify-content-end mt-3">
                            <button class="btn btn-sm btn-success me-3">
                                <i class="fas fa-check"></i>
                                Proses Resep
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card border-left-info shadow py-2 mt-3">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-info text-uppercase mb-1">
                                Jumlah Pesanan Masuk</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">20</div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-store fa-2x text-gray-300"></i>
                        </div>
                        <div class="d-flex justify-content-end mt-3">
                            <button class="btn btn-sm btn-success me-3">
                                <i class="fas fa-check"></i>
                                Proses Pesanan
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->
    </div>
</template>

<script>
import LoadingIndicator from '@/components/partials-component/LoadingIndicator.vue';
import axios from 'axios'
import { Form } from 'vee-validate'
import Cookies from "js-cookie"
export default {
    data() {
        return {
            datas: '',
            isLoading: false,
            plotting: [],
            riwayat: []
        }
    },
    mounted() {
        this.getCountData()
    },
    created() {
        this.getResep()
        // this.getRiwayat()
    },
    methods: {
        getCountData() {
            let type = "getData"
            let url = [
                "count_data", {}
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.datas = result.jumlahData
                setTimeout(() => {
                    this.isLoading = false
                }, 2000);
            }).catch((err) => {
                console.log(err);
            })
        },
        getResep() {
            let type = "getData"
            let url = [
                "plotting", {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.plotting = result.data
                console.log(result);
            }).catch((err) => {
                console.log(err);
            })
        },
    },
    components: {
        LoadingIndicator, Form

    }
}
</script>