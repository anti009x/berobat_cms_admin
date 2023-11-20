<template>
    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <div class="d-flex justify-content-between">
                <h6 class="m-0 font-weight-bold text-primary">Data {{ $route.name }}</h6>
                <div class="d-flex justify-content-start">
                    <div>
                        <ButtonComponent v-if="$can('action', 'Rumah Sakit')" Message="Tambah Data +" data-bs-toggle="modal" data-bs-target="#tambahData" />
                        <div v-if="selectedId.length === 0"></div>
                        <ButtonComponent v-else-if="selectedId" Icon="fa-trash" Color="btn-danger" Message="hapus"
                            @click="deleteRumahSakit" />
                    </div>
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th>no</th>
                            <th>Tanggal</th>
                            <th>Jam</th>
                        </tr>
                    </thead>
                    <tbody v-if="isLoading">
                        <EmptyLoading />
                    </tbody>
                    <tbody v-else-if="jadwalPraktek.length == 0">
                        <EmptyData />
                    </tbody>
                    <template v-else>
                        <tbody v-for="(data, index) in jadwalPraktek" :key="index">
                            <tr>
                                <td>
                                    {{ (iteration(index)) }}
                                </td>
                                <td>{{ data.tanggal }}</td>
                                <td>{{ data.mulaiJam }} s/d {{ data.selesaiJam }}</td>
                            </tr>
                        </tbody>
                    </template>
                </table>
                <pagination :currentPage="pagination.currentPage" :rowsTotal="pagination.total"
                    :lastPage="pagination.lastPage" @onPageChange="onPageChange($event)" />
            </div>
        </div>
    </div>
    <ModalComponent id="tambahData">
        <template #modal>
            <SelectOption Width="50" Label="Hari" v-model="form.hari">
                <template #option>
                    <option value="">---pilih hari---</option>
                    <option v-for="day in days" :value="day.value" :key="day.value">{{ day.label }}</option>
                </template>
            </SelectOption>
            <div class="mt-2">
                <Label>Waktu Mulai</Label>
                <InputField Name="waktuMulai" type="time" v-model="form.mulai_jam" />
                <Label>Waktu Akhir</Label>
                <InputField type="time" Name="waktuAkhir" v-model="form.selesai_jam" />
            </div>
            <ButtonComponent @click="postJadwal" />
        </template>
    </ModalComponent>
    <!-- <VDatePicker v-if="$can('action', 'Rumah Sakit')" v-model="date" mode="date" :min-date="minDate" :max-date="maxDate" :attributes="attributes"
        :disabled-dates="disabledDates" :select-attribute="selectAttribute" /> -->
</template>
<script>
import pagination from '@/components/partials-component/PaginationComponent.vue'
import iziToast from 'izitoast'
import InputField from '@/components/partials-component/InputField.vue'
import SelectOption from '@/components/partials-component/SelectOption.vue'
import ModalComponent from '@/components/partials-component/ModalComponent.vue'
import ButtonComponent from '@/components/partials-component/ButtonComponent.vue'
import EmptyLoading from '@/components/empty-table/EmptyLoading.vue'
import EmptyData from '@/components/empty-table/EmptyData.vue'
export default {
    data() {
        return {
            form: {
                hari: '',
                mulai_jam: '',
                selesai_jam: ''
            },
            days: [
                { value: 'Monday', label: 'Senin' },
                { value: 'Tuesday', label: 'Selasa' },
                { value: 'Wednesday', label: 'Rabu' },
                { value: 'Thursday', label: 'Kamis' },
                { value: 'Friday', label: 'Jum\'at' },
                { value: 'Saturday', label: 'Sabtu' },
                { value: 'Sunday', label: 'Minggu' }
            ],
            jadwalPraktek: [],
            isLoading: false,
            selectedId: [],
            attributes: [],
            date: (new Date()),
            selectAttribute: ({ content: true, content: 'red' }),
            pagination: {
                total: 0,
                perPage: 10,
                currentPage: 1,
                lastPage: 0,
                page: 0,
            },
        }
    },
    computed: {
        minDate() {
            const year = this.date.getFullYear();
            const month = this.date.getMonth();
            return new Date(year, month, 1);
        },
        maxDate() {
            const year = this.date.getFullYear();
            const month = this.date.getMonth();
            const lastDay = new Date(year, month + 1, 0).getDate();
            return new Date(year, month, lastDay);
        },
        idFromParams() {
            return this.$route.name
        }
    },
    mounted() {
        this.getJadwalPraktek();
    },
    methods: {
        getJadwalPraktek() {
            const ahliId = this.$route.params.idAhli;
            const rsId = this.$route.params.idRs;
            const params = [
                `page=${this.pagination.page}`,
                `per_page=${this.pagination.perPage}`,
            ].join("&");
            this.isLoading = true;
            this.$store.dispatch("getData", [`master/ahli/jadwal_praktek/${ahliId}/${rsId}`, params])
                .then((result) => {
                    this.jadwalPraktek = result.data;
                    this.pagination.total = result.meta.total;
                    this.pagination.currentPage = result.meta.currentPage;
                    this.pagination.lastPage = result.meta.lastPage;
                    this.isLoading = false;
                    console.log(result);
                    this.updateAttributes();
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        iteration(index){
            return(
                (this.pagination.currentPage -1) * this.pagination.perPage + index + 1
            )
        },
        onPageChange(page) {
            this.pagination.page = page;
            this.getJadwalPraktek();
        },
        updateAttributes() {
            this.attributes = this.jadwalPraktek.map((jadwal) => ({
                content: true,
                content: 'blue',
                dates: [new Date(jadwal.tanggal)],
                popover: {
                    label: `${jadwal.mulaiJam} - ${jadwal.selesaiJam}`,
                    content: 'This is a popover content.',
                    placement: 'top'
                }
            }));
        },
        postJadwal() {
            const detailId = this.$route.params.idPraktek
            let type = "postData"
            let url = [
                `master/ahli/jadwal_praktek/${detailId}`, this.form, {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                iziToast.success({
                    title: 'success',
                    message: 'berhasil tambah data',
                    position: 'topRight',
                })
                this.getJadwalPraktek()
            }).catch((err) => {
                console.log(err);
            })
        }
    },
    components: {
        EmptyLoading, ButtonComponent, ModalComponent, SelectOption, InputField, pagination, EmptyData
    }
}
</script>