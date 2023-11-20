<template>
    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <div class="d-flex justify-content-between">
                <h6 class="m-0 font-weight-bold text-primary">Data {{ $route.name }}</h6>
                <div class="d-flex justify-content-start" v-if="$can('action', 'Owner')">
                    <ButtonComponent Message="Tambah Data +" data-bs-toggle="modal" data-bs-target="#tambahData" />
                    <div v-if="selected.length === 0"></div>
                    <ButtonComponent v-else-if="selected" Color="btn-danger" Message="Hapus" @click="deleteGroup"/>
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered" id="" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th v-if="$can('action', 'Owner')">Pilih</th>
                            <th>Kategori Produk</th>
                            <th>Nama Produk</th>
                            <th v-if="$can('action', 'Owner')">Aksi</th>
                        </tr>
                    </thead>
                    <tbody v-if="isLoading">
                        <EmptyLoading />
                    </tbody>
                    <tbody v-else-if="groupingProduk.length == 0">
                        <EmptyData />
                    </tbody>
                    <template v-else-if="groupingProduk.length">
                        <tbody v-for="(data, index) in groupingProduk" :key="index">
                            <tr>
                                <td>
                                    {{ index + 1 }}
                                </td>
                                <td v-if="$can('action', 'Owner')">
                                    <input type="checkbox" :value="data.idProdukKategori" v-model="selected">
                                </td>
                                <td v-if="data.kategori">
                                    {{ data.kategori.namaKategoriProduk }}
                                </td>
                                <td v-else>
                                    <strong>
                                        <i>
                                            Data Tidak Ada
                                        </i>
                                    </strong>
                                </td>
                                <td v-if="data.produk">
                                    {{ data.produk.namaProduk }}
                                </td>
                                <td v-else>
                                    <strong>
                                        <i>
                                            Data Tidak Ada
                                        </i>
                                    </strong>
                                </td>
                                <td v-if="$can('action', 'Owner')">
                                    <router-link :to="'grouping_produk/' + data.idProdukKategori + '/edit'">
                                    <ButtonComponent Color="btn-warning" Message="edit" />
                                    </router-link>
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </table>
            </div>
        </div>
    </div>
    <ModalComponent id="tambahData">
        <template #modal>
            <Form @submit="postGroup">
                <div>
                    <SelectOption v-model="form.kode_produk" Width="w-100" Label="Produk">
                        <template #option>
                            <option value="">pilih produk</option>
                            <option :value="data.kodeProduk" v-for="data in produkApotek">{{ data.namaProduk }}</option>
                        </template>
                    </SelectOption>
                </div>
                <br>
                <div>
                    <SelectOption v-model="form.id_kategori_produk" Width="w-100" Label="Kategori Produk">
                        <template #option>
                            <option value="">pilih kategori produk</option>
                            <option :value="data.idKategoriProduk" v-for="data in kategoriProduk">{{ data.namaKategoriProduk }}</option>
                        </template>
                    </SelectOption>
                </div>
                <br>
                <ButtonComponent />
            </Form>
        </template>
    </ModalComponent>
</template>

<script>
import { Form } from 'vee-validate'
import LoadingIndicator from '@/components/partials-component/LoadingIndicator.vue'
import EmptyData from '@/components/empty-table/EmptyData.vue';
import EmptyLoading from '@/components/empty-table/EmptyLoading.vue';
import SelectOption from '@/components/partials-component/SelectOption.vue'
import ButtonComponent from '@/components/partials-component/ButtonComponent.vue'
import ModalComponent from '@/components/partials-component/ModalComponent.vue'
export default {
    data() {
        return {
            groupingProduk: [],
            produkApotek: [],
            kategoriProduk: [],
            form: {
                id_kategori_produk: '',
                kode_produk: '',
            },
            selected: [],
            isLoading: false
        };
    },
    created() {
        this.getProdukApotek();
        this.getGrouping(),
            this.getKategoriProduk()
    },
    methods: {
        getGrouping() {
            let type = "getData";
            let url = [
                "apotek/produk/produk_kategori",
                {}
            ];
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.groupingProduk = result.data;
                console.log(result.data);
                this.isLoading = false
            }).catch((err) => {
                console.log(err);
            });
        },
        getKategoriProduk() {
            let type = "getData"
            let url = [
                "master/produk/kategori_produk", {}
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.kategoriProduk = result.data
                this.isLoading = false
            }).catch((err) => {
                console.log(err);
            })
        },
        goBack(){
            window.location = '/apotek/grouping_produk'
        },
        postGroup() {
            let type = "postData"
            let url = [
                "apotek/produk/produk_kategori", this.form
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.goBack()
            }).catch((err) => {
                console.log(err);
            })
        },
        getProdukApotek() {
            let type = "getData"
            let url = [
                "apotek/produk/data_produk", {}
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.isLoading = false
                this.produkApotek = result.data
                console.log(result.data);
            }).catch((err) => {
                console.log(err);
            })
        },
        deleteGroup(){
            if (this.selected.length === 0) {
                return;
            }
            let type = "deleteData";
            let urls = this.selected.map((idProdukKategori) => ["apotek/produk/produk_kategori", idProdukKategori]);
            this.$swal({
                icon: 'question',
                title: "Apakah kamu ingin menyimpan perubahan",
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: "Ya, Hapus",
                denyButtonText: "Jangan Hapus"
            }).then((results) => {
                if (results.isConfirmed) {
                    Promise.all(urls.map((url) => this.$store.dispatch(type, url)))
                    this.$swal({
                        icon: 'success',
                        text: 'data berhasil dihapus'
                    })
                    this.getGrouping();
                }
            })
                .catch((err) => {
                    console.log(err);
                });
            this.selected = [];
        }

    },
    components: { LoadingIndicator, EmptyData, EmptyLoading, Form, SelectOption, ButtonComponent, ModalComponent }
}


</script>