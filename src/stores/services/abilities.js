import {
    defineAbility
} from '@casl/ability';
import Cookie from "js-cookie";

const permisionsByRole = {
    "RO-2003061": [
        'show_Rules','Rules',
        'show_Artikel', 'action_Artikel',
        'show_Rumah Sakit', 'action_Admin',
        'show_Dokter',
        'show_Konsumen',
        'show_Perawat',
        'show_User',
        'show_Apotek', 'action_Apotek',
        'show_Keahlian',
        'action_Kategori Produk', 'show_Kategori Produk',
        'show_Spesialis'
        
    ],
    "RO-2003062": [
        'show_Artikel', 'action_Dokter'
    ],
    "RO-2003063": [
         'show_Perawat', 'action_Perawat'
    ],
    "RO-2003065": [
        'show_Apotek','action_Owner', 'show_Kategori Produk', 'action_Owner Admin'
    ],
    "RO-2003066": [
        'action_Rumah Sakit',
        'show_Rumah Sakit',
        'show_Fasilitas',
        'create_Fasilitas',
        'show_Dokter',
        'show_Spesialis'
    ],
    "RO-2003067": [
        'show_Apotek', 'action_Admin Apotek', 'action_Owner Admin', 'show_Kategori Produk',
    ]
}
export default defineAbility(can => {
    if (Cookie.get('user') !== undefined) {
        const user = JSON.parse(Cookie.get('user'))
        const roles = user.data.getRole.idRole
        const permisions = permisionsByRole[roles] || [];
        for (const permision of permisions) {
            const [actions, resource] = permision.split('_')
            can([actions], resource)
        }
    }
}
);