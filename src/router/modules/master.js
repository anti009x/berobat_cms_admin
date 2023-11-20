import MasterData from '@/views/master-data/IndexMasterData.vue'
import KategoriProduk from '@/views/master-data/obat-produk/KategoriProduk.vue'
import EditKategoriProduk from '@/views/master-data/obat-produk/EditKategoriProduk.vue'

import IndexArtikel from '@/views/master-data/artikel/data-artikel/IndexArtikel.vue'

import Rules from '@/views/master-data/rules/Rules.vue'

import EditArtikel from '@/views/master-data/artikel/data-artikel/EditArtikel.vue'
import KategoriArtikel from '@/views/master-data/artikel/kategori-artikel/KategoriArtikel.vue'
import EditKategoriArtikel from '@/views/master-data/artikel/kategori-artikel/EditKategoriArtikel.vue'
import GroupingArtikel from '@/views/master-data/artikel/grouping-artikel/GroupingArtikel.vue'
import EditGroupingArtikel from '@/views/master-data/artikel/grouping-artikel/EditGroupingArtikel.vue'

import IndexRumahSakit from '@/views/master-data/rumah-sakit/data-rs/IndexRumahSakit.vue'
import TambahRumahSakit from '@/views/master-data/rumah-sakit/data-rs/TambahRumahSakit.vue'
import EditRumahSakit from '@/views/master-data/rumah-sakit/data-rs/EditRumahSakit.vue'
import SpesialisRumahSakit from '@/views/master-data/rumah-sakit/spesialis-rs/SpesialisRumahSakit.vue'
import EditSpesialisRumahSakit from '@/views/master-data/rumah-sakit/spesialis-rs/EditSpesialisRumahSakit.vue'
import FasilitasRumahSakit from '@/views/master-data/rumah-sakit/fasilitas-rs/FasilitasRumahSakit.vue'
import EditFasilitas from '@/views/master-data/rumah-sakit/fasilitas-rs/EditFasilitas.vue'
import DokterSpesialisRumahSakit from '@/views/master-data/rumah-sakit/dokter-spesialis-rs/DokterSpesialisRumahSakit.vue'
import DokterRumahSakit from '@/views/master-data/rumah-sakit/dokter-rs/IndexDokterRs.vue'

import IndexSpesialis from '@/views/master-data/spesialis-penyakit/IndexSpesialis.vue'
import EditSpesialisPenyakit from '@/views/master-data/spesialis-penyakit/EditSpesialisPenyakit.vue'
import IndexDokterSpesialis from '@/views/master-data/dokter-spesialis/index.vue'
import IndexPraktek from '@/views/master-data/rumah-sakit/praktek-dokter/index.vue'
import DetailPraktek from '@/views/master-data/rumah-sakit/praktek-dokter/JadwalPraktek.vue'
import EditJadwalPraktek from '@/views/master-data/rumah-sakit/praktek-dokter/EditJadwalPraktek.vue'

import IndexRs from '../../views/master-data/owner-rs/IndexOwnerRs.vue'
import EditOwnerRs from '@/views/master-data/owner-rs/EditOwnerRs.vue'
import UpdateOwnerRs from '@/views/master-data/owner-rs/UpdateOwnerRs.vue'
import { checkRoles, roles } from '../../middleware/redirect';
import JadwalAntrian from '../../views/master-data/rumah-sakit/jadwal-antrian/IndexJadwalAntrian.vue'
import RiwayatKunjungan from '../../views/master-data/rumah-sakit/jadwal-antrian/IndexRiwayatKunjungan.vue'

import AktivasiAkun from '@/views/aktivasi-akun/IndexAkun.vue'
import AktivasiAkunPerawat from '@/views/aktivasi-akun/AktivasiPerawat.vue'
import AktivasiOwnerApotek from '@/views/aktivasi-akun/AktivasiOwnerApotek.vue'
import AktivasiOwnerRs from '@/views/aktivasi-akun/AktivasiRumahSakit.vue'
import RekapKonsultasi from '@/views/konsumen/RekapKonsultasi.vue'





export default [{
    path: '/master',
    name: 'Master Data',
    component: MasterData,
},


{
    path: '/rekap_konsultasi',
    name: 'Rekap Konsultasi',
    component: RekapKonsultasi,
    meta: {
        middleware: checkRoles(roles.admin)
    }
},
{
    path: '/aktivasi_dokter',
    name: 'Aktivasi Akun Dokter',
    component: AktivasiAkun,
    meta: {
        middleware: checkRoles(roles.admin)
    }
},
{
    path: '/aktivasi_perawat',
    name: 'Aktivasi Akun Perawat',
    component: AktivasiAkunPerawat,
    meta: {
        middleware: checkRoles(roles.admin)
    }
},
{
    path: '/aktivasi_owner_apotek',
    name: 'Aktivasi Akun Apotek',
    component: AktivasiOwnerApotek,
    meta: {
        middleware: checkRoles(roles.admin)
    }
},
{
    path: '/aktivasi_owner_rs',
    name: 'Aktivasi Akun Rs',
    component: AktivasiOwnerRs, 
    meta: {
        middleware: checkRoles(roles.admin)
    }
},
{
    path: '/master',
    children: [
        // Routes Produk
        {
            path: 'kategori_produk',
            name: 'Kategori Produk',
            component: KategoriProduk,
            meta: {
                middleware: checkRoles(roles.adminOwnerApt)
            }
        },
        {
            path: 'kategori_produk/:id/edit',
            name: 'Edit Kategori Produk',
            component: EditKategoriProduk,
            meta: {
                middleware: checkRoles(roles.admin)
            }
        },
        // Routes Artikel
        {
            path: 'artikel',
            name: 'Artikel',
            component: IndexArtikel,
            meta: {
                middleware: checkRoles(roles.adminDokter)
            }
        },

           // Routes Rules
           {
            path: '/rules',
            name: 'Rules',
            component: Rules,
            meta: {
                middleware: checkRoles(roles.adminDokter)
            }
        },

        {
            path: 'artikel/:id/edit',
            name: 'Edit Artikel',
            component: EditArtikel,
            meta: {
                middleware: checkRoles(roles.adminDokter)
            }
        },
        {
            path: 'kategori_artikel',
            name: 'Kategori Artikel',
            component: KategoriArtikel,
            meta: {
                middleware: checkRoles(roles.adminDokter)
            }
        },
        {
            path: 'kategori_artikel/:id/edit',
            name: 'Edit Kategori Artikel',
            component: EditKategoriArtikel,
            meta: {
                middleware: checkRoles(roles.admin)
            }
        },
        {
            path: 'grouping_artikel',
            name: 'Grouping Artikel',
            component: GroupingArtikel,
            meta: {
                middleware: checkRoles(roles.admin)
            }
        },
        {
            path: 'grouping_artikel/:id/edit',
            name: 'Edit Grouping Artikel',
            component: EditGroupingArtikel,
            meta: {
                middleware: checkRoles(roles.admin)
            }
        },
        // Routes Rumah Sakit
        {
            path: 'rumah_sakit',
            name: 'Rumah Sakit',
            component: IndexRumahSakit,
        },
        {
            path: 'rumah_sakit/create',
            name: 'Tambah Rumah Sakit',
            component: TambahRumahSakit,
            meta: {
                middleware: checkRoles(roles.adminRs)
            }
        },
        {
            path: 'rumah_sakit/:id/edit',
            name: 'Edit Rumah Sakit',
            component: EditRumahSakit,
            meta: {
                middleware: checkRoles(roles.adminRs)
            }
        },
        {
            path: 'rumah_sakit/spesialis/:idRumahSakit/:namaRs',
            name: 'Spesialis Rumah Sakit',
            component: SpesialisRumahSakit,
            meta: {
                middleware: checkRoles(roles.adminRsadminWeb)
            }
        },
        {
            path: 'rumah_sakit/spesialis/:idSpesialis',
            name: 'Edit Spesialis Rumah Sakit',
            component: EditSpesialisRumahSakit,
            meta: {
                middleware: checkRoles(roles.adminRs)
            }
        },
        {
            path: 'rumah_sakit/dokter/:namaSpesialis/:namaRs/:idSpesialis/:id',
            name: 'Dokter Spesialis Rs',
            component: DokterSpesialisRumahSakit
        },
        {
            path: 'rumah_sakit/dokter',
            name: 'Dokter Rumah Sakit',
            component: DokterRumahSakit,
            meta: {
                middleware: checkRoles(roles.adminRs)
            }
        },
        {
            path: 'fasilitas_rs/:id/show',
            name: 'Fasilitas Rumah Sakit',
            component: FasilitasRumahSakit,
            meta: {
                middleware: checkRoles(roles.adminRsadminWeb)
            }
        },
        {
            path: 'fasilitas_rs/:id/edit',
            name: 'Edit Fasilitas Rumah Sakit',
            component: EditFasilitas,
            meta: {
                middleware: checkRoles(roles.adminRs)
            }
        },
        {
            path: '/praktek',
            children: [
                {
                    path: ':idRs/dokter',
                    name: 'Daftar Dokter',
                    component: IndexPraktek,
                    meta: {
                        middleware: checkRoles(roles.adminRsadminWeb)
                    }
                },
                {
                    path: ':idAhli/:idPraktek/:idRs/',
                    name: 'Detail Jadwal Praktek',
                    component: DetailPraktek, 
                    meta: {
                        middleware: checkRoles(roles.adminRsadminWeb)
                    }
                },
                {
                    path: 'edit/:idJadwalPraktek',
                    name: 'Edit Jadwal Praktek',
                    component: EditJadwalPraktek,
                    meta: {
                        middleware: checkRoles(roles.adminRsadminWeb)
                    }
                }
            ]
        },
        {
            path: 'jadwal-antrian',
            name: 'list jadwal antrian',
            component: JadwalAntrian,
            meta: {
                middleware: checkRoles(roles.dokter)
            }
        },
        {
            path: 'riwayat-kunjungan',
            name: 'Riwayat Kunjungan',
            component: RiwayatKunjungan,
            meta: {
                middleware: checkRoles(roles.dokter)
            }
        },
        // Owner Rumah Sakit
        {
            path: 'owner_rs',
            name: 'Owner Rumah Sakit',
            component: IndexRs,
            meta: {
                middleware: checkRoles(roles.admin)
            }
        },
        {
            path: 'owner_rs/:id',
            name: 'Update Owner Rumah Sakit',
            component: UpdateOwnerRs,
            meta: {
                middleware: checkRoles(roles.admin)
            }
        },
        {
            path: 'owner_rs/:id/edit',
            name: 'Edit Owner Rumah Sakit',
            component: EditOwnerRs,
            meta: {
                middleware: checkRoles(roles.admin)
            }
        },
        // Routes Spesialis
        {
            path: 'spesialis_penyakit',
            name: 'Spesialis Penyakit',
            component: IndexSpesialis,
            meta: {
                middleware: checkRoles(roles.adminRsadminWeb)
            }
        },
        {
            path: 'spesialis_penyakit/:id/edit',
            name: 'Edit Spesialis Penyakit',
            component: EditSpesialisPenyakit,
            meta: {
                middleware: checkRoles(roles.admin)
            }
        },
        {
            path: 'spesialis_penyakit/',
            children: [
                {
                    path: ':idSpesialis/dokter',
                    name: 'Dokter Spesialis',
                    component: IndexDokterSpesialis,
                    meta: {
                        middleware: checkRoles(roles.admin)
                    }
                }
            ]
        },
    ]
}
]