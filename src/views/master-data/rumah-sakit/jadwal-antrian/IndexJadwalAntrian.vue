<template>
    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <div class="d-flex justify-content-between">
                <h6 class="m-0 font-weight-bold text-primary">Data {{ $route.name }}</h6>
            </div>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama</th>
                            <th>Jadwal</th>
                            <th>Status</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody v-if="isLoading">
                        <EmptyLoading />
                    </tbody>
                    <tbody v-else-if="antrian.length === 0">
                        <EmptyData Label="belum ada antrian pasien nihh" />
                    </tbody>
                    <template v-else>
                        <tbody v-for="(data, index) in antrian" :key="index">
                            <tr>
                                <td>
                                    {{ index + 1 }}
                                </td>
                                <td>
                                    {{ data.konsumen.user.nama }}
                                </td>
                                <td>
                                    {{ data.praktek.jadwal.tanggal }}
                                </td>
                                <td>
                                    <template v-if="data.status == 1">
                                        belum konsultasi
                                    </template>
                                </td>
                                <td>
                                    <ButtonComponent Message="Selesaikan konsultasi"
                                        @click="ubahStatus(data.idJadwalAntrian)" />
                                    <ButtonComponent Message="Detail" data-bs-toggle="modal" data-bs-target="#detail" @click="lihat(data.idJadwalAntrian)"/>
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </table>
            </div>
        </div>
    </div>
    <ModalComponent id="detail">
        <template #modal>
            <img :src="convert(qr.qrCode)" alt="">
        </template>
    </ModalComponent>
</template>

<script>
import ModalComponent from '@/components/partials-component/ModalComponent.vue'
import EmptyData from '@/components/empty-table/EmptyData.vue'
import EmptyLoading from '@/components/empty-table/EmptyLoading.vue'
import ButtonComponent from '@/components/partials-component/ButtonComponent.vue'
export default {
    data() {
        return {
            antrian: [],
            riwayat: [],
            isLoading: false,
            qr: {}
        }
    },  
    created() {
        this.getAntrian(),
        this.getRiwayat()
    },
    methods: {
        getAntrian() {
            let type = "getData";
            let url = ["ahli/jadwal_antrian", {}];
            this.isLoading = true;
            this.$store.dispatch(type, url)
                .then((result) => {
                    this.antrian = result.data;
                    this.isLoading = false;
                    console.log(result);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        ubahStatus(idJadwalAntrian) {
            let type = "putData";
            let url = [`ahli/jadwal_antrian/${idJadwalAntrian}`, {}];
            this.$swal({
                icon: 'question',
                title: "Apakah sudah selesai melakukan konsultasi?",
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: "Ya, sudah",
                denyButtonText: "Belum nih"
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$store.dispatch(type, url)
                        .then(() => {
                            this.$swal({
                                icon: 'success',
                                title: 'berhasil melakukan konsultasi'
                            });
                            this.getAntrian();
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            });
        },
        lihat(idJadwalAntrian) {
            let type = "getData"
            let url = [
                `qr/${idJadwalAntrian}`, {}
            ]
            this.loadingQr = true
            this.$store.dispatch(type, url).then((result) => {
                // this.antrian = result
                this.loadingQr = false
                this.qr = result
            }).catch((err) => {
                console.log(err);
            })
        },
        convert(svgCode) {
            return `data:image/svg+xml;base64,${btoa(svgCode)}`
        },
        getRiwayat(){
            let type = "getData"
            let url = [
                "ahli/transaksi_buat_janji", {}
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result)=>{
                this.isLoading = false
                this.riwayat = result.data
            }).catch((err)=>{
                console.log(er);
            })
        }

    },
    components: {
        EmptyData, EmptyLoading, ButtonComponent, ModalComponent
    }
}
</script>