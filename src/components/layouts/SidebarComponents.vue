<template>
    <ul class="navbar-nav sidebar sidebar-dark accordion" id="accordionSidebar" style="background-color:darkslategrey">
        <router-link class="sidebar-brand d-flex align-items-center justify-content-center" to="/dashboard">
            <div class="sidebar-brand-icon rotate-n-15">
                <i class="fas fa-laugh-wink"></i>
            </div>
            <div class="sidebar-brand-text mx-3">BEROBAT+</div>
        </router-link>
        <hr class="sidebar-divider my-0">
        <li class="nav-item active">
            <router-link class="nav-link" to="index.html">
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span>Dashboard</span></router-link>
        </li>
        <hr class="sidebar-divider">
        <div class="sidebar-heading">
            Interface
        </div>
        <li class="nav-item">
            <router-link class="nav-link collapsed" to="#" data-toggle="collapse" data-target="#collapseTwo"
                aria-expanded="true" aria-controls="collapseTwo">
                <i class="fas fa-fw fa-cog"></i>
                <span>Master Data</span>
            </router-link>
            <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                <div class="bg-white py-2 collapse-inner rounded">
                    <div v-if="$can('show', 'Kategori Produk')">
                        <h6 class="collapse-header">Obat & Produk:</h6>
                        <router-link class="collapse-item" to="/master/kategori_produk">Kategori Produk</router-link>
                    </div>
                    <div v-if="$can('show', 'Artikel')">
                        <h6 class="collapse-header">Artikel</h6>
                        <router-link class="collapse-item" to="/master/kategori_artikel">Kategori Artikel</router-link>
                        <router-link class="collapse-item" to="/master/artikel">Data Artikel</router-link>
                        <router-link class="collapse-item" v-if="$can('action', 'Admin')" to="/master/grouping_artikel">Grouping Artikel</router-link>
                    </div>
                    <div  >
                        <h6 class="collapse-header">BASE RULES</h6>
                        <router-link class="collapse-item" to="/rules">Configrusi Gejala</router-link>
     
                    </div>

                    
                    <div>
                        <h6 class="collapse-header" v-if="$can('show', 'Rumah Sakit')">Rumah Sakit</h6>
                        <router-link class="collapse-item" v-if="$can('show', 'Rumah Sakit')" to="/master/rumah_sakit">Data Rumah Sakit</router-link>
                        <router-link class="collapse-item" v-if="$can('action', 'Rumah Sakit')" :to="{name: 'Dokter Rumah Sakit'}">Pengajuan Dokter</router-link>
                        <router-link class="collapse-item" v-if="$can('action', 'Admin')" to="/master/owner_rs">Owner Rumah Sakit</router-link>
                    </div>
                    <div v-if="$can('show', 'Rumah Sakit')">
                        <h6 class="collapse-header">Spesialis Penyakit</h6>
                        <router-link class="collapse-item" to="/master/spesialis_penyakit">Data Spesialis</router-link>
                    </div>
                </div>
            </div>
        </li>
        <NavItem v-if="$can('action', 'Admin')" span="Dokter" icon="fa-user-doctor" target="#collapseDokter">
            <template #item>
                <CollapseItem id="collapseDokter" title="Dokter & Keahlian">
                    <template #router>
                            <router-link class="collapse-item" to="/dokter">Data Dokter</router-link>
                            <router-link class="collapse-item" to="/dokter/keahlian_dokter">Keahlian Dokter</router-link>
                            <router-link class="collapse-item" to="/dokter/dokter_keahlian">Dokter Keahlian </router-link>
                    </template>
                </CollapseItem>
            </template>
        </NavItem>
        <NavItem v-if="$can('action', 'Admin')" span="Aktivasi Akun" icon="fa-user-doctor" target="#collapseActive">
            <template #item>
                <CollapseItem id="collapseActive" title="Aktivasi Akun">
                    <template #router>
                        <router-link class="collapse-item" to="/aktivasi_dokter">Dokter</router-link>
                        <router-link class="collapse-item" to="/aktivasi_perawat">Perawat</router-link>
                        <router-link class="collapse-item" to="/aktivasi_owner_apotek">Owner Apotek</router-link>
                        <router-link class="collapse-item" to="/aktivasi_owner_rs">Owner Rumah Sakit</router-link>
                    </template>
                </CollapseItem>
            </template>
        </NavItem>
        <NavItem v-if="$can('show', 'Perawat')" span="Perawat" icon="fa-user-nurse" target="#collapsePerawat">
            <template #item>
                <CollapseItem header="Perawat dan Rekap" id="collapsePerawat" title="Perawat & Rekap">
                    <template #router>
                        <router-link class="collapse-item" to="/perawat">Data Perawat</router-link>
                    </template>
                </CollapseItem>
            </template>
        </NavItem>
        <NavItem v-if="$can('show', 'Konsumen')" span="Konsumen" icon="fa-users" target="#collapseKomponen">
            <template #item>
                <CollapseItem header="Konsumen & Rekap" id="collapseKomponen" title="Konsumen & Rekap">
                    <template #router>
                        <router-link class="collapse-item" to="/konsumen">Data Konsumen</router-link>
                        <router-link class="collapse-item" to="/konsumen/riwayat">Riwatat Konsumen</router-link>
                    </template>
                </CollapseItem>
            </template>
        </NavItem>
        <NavItem v-if="$can('show', 'Apotek')" span="Apotek" icon="fa-users" target="#collapseApotek">
            <template #item>
                <CollapseItem header="Konsumen & Rekap" id="collapseApotek" title="Apotek & Rekap">
                    <template #router>
                        <router-link class="collapse-item" v-if="$can('action', 'Admin')" to="/owner_apotek">Data Owner Apotek</router-link>
                        <router-link class="collapse-item" to="/apotek">Data Apotek</router-link>
                        <router-link  v-if="$can('action', 'Admin Apotek')" class="collapse-item" to="/apotek/grouping_produk">Grouping Produk</router-link>
                    </template>
                </CollapseItem>
            </template>
        </NavItem>
        <NavItem v-if="$can('action', 'Admin')" span="Rekap Konsultasi" icon="fa-users" target="#collapseRekap">
            <template #item>
                <CollapseItem header="Konsumen & Rekap" id="collapseRekap" title="Rekap Data">
                    <template #router>
                        <router-link class="collapse-item" to="/rekap_konsultasi">Rekap Data Konsultasi</router-link>
                    </template>
                </CollapseItem>
            </template>
        </NavItem>
        <NavItem span="KunjunganMu" v-if="$can('action', 'Dokter')" icon="fa-users" target="#collapseKunjungan">
            <template #item>
                <CollapseItem header="" id="collapseKunjungan" title="Rekap dan Sesi Kunjungan">
                    <template #router>
                        <router-link class="collapse-item" :to="{name: 'list jadwal antrian'}">Sesi Kunjungan</router-link>
                        <router-link class="collapse-item" :to="{name: 'Riwayat Kunjungan'}">Riwayat Kunjungan</router-link>
                    </template>
                </CollapseItem>
            </template>
        </NavItem>
    </ul>
</template>

<script>
import NavItem from '../sidebar-additional/NavItem.vue';
import CollapseItem from '../sidebar-additional/CollapseItem.vue';
import HeaderCollapseItem from '../sidebar-additional/HeaderCollapseItem.vue';
import '../../stores/services/abilities'
export default {
    components: {
        NavItem,
        CollapseItem,
        HeaderCollapseItem
    }
}
</script>