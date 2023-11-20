<template>
    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <div class="d-flex justify-content-between">
                <h6 class="m-0 font-weight-bold text-primary">Data {{ $route.name }}</h6>
                <div class="d-flex justify-content-start">
                    <ButtonComponent Color="btn-primary" Icon="fa-plus" Message="Tambah Data" data-bs-toggle="modal"
                    data-bs-target="#tambahData" />
                    <div v-if="selectedId.length === 0"></div>
                    <ButtonComponent v-else-if="selectedId" Icon="fa-trash" Color="btn-danger" @click="deleteGroup()" Message="hapus"/>
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th>no</th>
                            <th>pilih</th>
                            <th>Judul Artikel</th>
                            <th>kategori artikel</th>
                            <th>aksi</th>
                        </tr>
                    </thead>
                    <tbody v-if="isLoading">
                        <EmptyLoading/>
                    </tbody>
                    <tbody v-else-if="grupArtikel.length == 0">
                        <EmptyData/>
                    </tbody>
                    <template v-else-if="grupArtikel.length">
                        <tbody v-for="(data, index) in grupArtikel" :key="index">
                            <tr>
                                <td>
                                    {{ index + 1 }}
                                </td>
                                <td v-if="data.idGroupingArtikel">
                                    <input type="checkbox" v-model="selectedId" :value="data.idGroupingArtikel">
                                </td>
                                <td>
                                    {{ data.judulArtikel }}
                                </td>
                                <td v-if="data.namaKategori">
                                    {{ data.namaKategori }}
                                </td>
                                <td v-else>
                                    kosong
                                </td>
                                <td>
                                    <div class="d-flex justify-content-start">
                                        <router-link :to="'grouping_artikel/' + data.idGroupingArtikel + '/edit'">
                                            <ButtonComponent Message="Edit" Color="btn-warning"/>
                                        </router-link>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </table>
            </div>
        </div>
    </div>
    <ModalComponent id="tambahData" :modalTitle="'Tambah ' + $route.name">
        <template #modal>
            <Form @submit="postGroup">
                <SelectOption v-model="form.id_artikel" Width="w-100" Label="Judul Artikel">
                    <template #option>
                        <option value="">pilih judul artikel</option>
                        <option :value="data.idArtikel" v-for="data in dataArtikel" :key="index">{{
                            data.judulArtikel }}
                        </option>
                    </template>
                </SelectOption>
                <br>
                <SelectOption Label="Kategori Artikel" v-model="form.id_kategori_artikel" Width="w-100">
                    <template #option>
                        <option value="">pilih kategori artikel</option>
                        <option :value="data.idKategoriArtikel" v-for="data in dataKategoriArtikel" :key="index">{{
                            data.namaKategori }}
                        </option>
                    </template>
                </SelectOption>
                <br>
                <ButtonComponent />
            </Form>
        </template>
    </ModalComponent>
</template>

<script>
import { Form } from 'vee-validate'
import ButtonComponent from '@/components/partials-component/ButtonComponent.vue'
import iziToast from 'izitoast';
import ModalComponent from '@/components/partials-component/ModalComponent.vue'
import SelectOption from '@/components/partials-component/SelectOption.vue';
import EmptyLoading from '@/components/empty-table/EmptyLoading.vue';
import EmptyData from '@/components/empty-table/EmptyData.vue';
export default {
    data() {
        return {
            grupArtikel: [],
            dataArtikel: [],
            dataKategoriArtikel: [],
            form: {
                id_artikel: '',
                id_kategori_artikel: ''
            },
            isLoading: false,
            selectedId: []
        };
    },
    created() {
        this.getGroupArtikel();
        this.getArtikel(),
        this.getKategoriArtikel()
    },
    methods: {
        getGroupArtikel() {
            let type = "getData";
            let url = [
                "master/grouping_artikel",
                {}
            ];
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.grupArtikel = result.data;
                this.isLoading = false
                console.log(result);
            }).catch((err) => {
                console.log(err);
            });
        },
        getArtikel() {
            let type = "getData"
            let url = [
                "master/artikel", {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.dataArtikel = result.data
                console.log(result.data);
            }).catch((err) => {
                console.log(err);
            })
        },
        getKategoriArtikel() {
            let type = "getData"
            let url = [
                "master/kategori_artikel", {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.dataKategoriArtikel = result.data
            }).catch((err) => {
                console.log(err);
            })
        },
        goBack() {
            window.location = '/master/grouping_artikel'
        },
        postGroup() {
            console.log('halo')
            let type = "postData"
            let url = [
                "master/grouping_artikel", this.form, {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.getGroupArtikel()
                this.goBack()
            }).catch((err) => {
                console.log(err);
            })
        },
        deleteGroup() {
            if(this.selectedId.length === 0){
                return
            }
            let type = "deleteData"
            let urls = this.selectedId.map((idGroupingArtikel)=>["master/grouping_artikel", idGroupingArtikel])
            this.$swal({
                icon: 'question',
                title: 'apakah ingin menghapus data?',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Ya, hapus',
                denyButtonText: 'Jangan hapus'
            }).then((result)=>{
                if(result.isConfirmed){
                    Promise.all(urls.map((url)=> this.$store.dispatch(type, url)))
                    this.$swal({
                        icon: 'success',
                        text: 'data berhasil dihapus'
                    })
                    this.getGroupArtikel()
                }
            }).catch((err)=>{
                console.log(err);
            }) 
            this.selectedId = []
        }
    },
    components: {
        Form,
        ButtonComponent,
        ModalComponent,
        SelectOption,
        EmptyLoading,
        EmptyData
    }
}
</script>