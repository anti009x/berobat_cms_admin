import PageDokter from '@/views/dokter/data-dokter/IndexDokter.vue'
import KeahlianDokter from '@/views/dokter/keahlian-dokter/KeahlianDokter.vue'
import EditKeahlianDokter from '@/views/dokter/keahlian-dokter/EditKeahlianDokter.vue'
import DokterKeahlian from '@/views/dokter/dokter-keahlian/DokterKeahlian.vue'
import EditDokterKeahlian from '@/views/dokter/dokter-keahlian/EditDokterKeahlian.vue'
import UpdateDokter from '@/views/dokter/data-dokter/UpdateDokter.vue'
import { checkRoles, roles } from '../../middleware/redirect'
export default [
{
    path: '/dokter',
    component: PageDokter,
    name: 'Dokter',
    meta: {
        middleware: checkRoles(roles.admin)
    }
},
{
    path: '/dokter',
    children: [
        {
            path: 'keahlian_dokter',
            name: 'Keahlian Dokter',
            component: KeahlianDokter,
            meta: {
                middleware: checkRoles(roles.admin)
            }
        },
        {
            path: 'keahlian_dokter/:id/edit',
            name: 'Edit Keahlian Dokter',
            component: EditKeahlianDokter,
            meta: {
                middleware: checkRoles(roles.admin)
            }
        },
        {
            path: 'dokter_keahlian',
            name: 'Dokter Keahlian',
            component: DokterKeahlian,
            meta: {
                middleware: checkRoles(roles.admin)
            }
        },
        {
            path: 'dokter_keahlian/:id/edit',
            name: 'Edit Dokter Keahlian',
            component: EditDokterKeahlian,
            meta: {
                middleware: checkRoles(roles.admin)
            }
        },
        {
            path: ':id',
            name: 'Update Nomor STR Dokter',
            component: UpdateDokter,
            meta: {
                middleware: checkRoles(roles.admin)
            }
        }
    ]
}
]