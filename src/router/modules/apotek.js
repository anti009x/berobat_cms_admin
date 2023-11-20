import OwnerApotek from '../../views/apotek/owner-apotek/OwnerApotek.vue'
import UpdateOwnerApotek from '../../views/apotek/owner-apotek/UpdateOwnerApotek.vue'
import DataApotek from '../../views/apotek/data-apotek/IndexApotek.vue'
import GroupingProduk from '../../views/apotek/grouping-produk/GroupingProduk.vue'
import EditGroupingProduk from '../../views/apotek/grouping-produk/EditGroupingProduk.vue'
import ProdukApotek from '../../views/apotek/produk-apotek/ProdukApotek.vue'
import EditProdukApotek from '../../views/apotek/produk-apotek/EditProdukApotek.vue'
import TambahApotek from '../../views/apotek/data-apotek/TambahApotek.vue'
import EditApotek from '../../views/apotek/data-apotek/EditApotek.vue'
import {roles, checkRoles} from '../../middleware/redirect'
export default[{
    path: '/owner_apotek',
    name: 'Owner Apotek',
    component: OwnerApotek,
    meta: {
        middleware: checkRoles(roles.admin)
    }
},
{
    path: '/owner_apotek/:id',
    name: 'UpdateOwnerApotek',
    component: UpdateOwnerApotek,
    meta: {
        middleware: checkRoles(roles.admin)
    }
},
{
    path: '/apotek',
    name: 'Data Apotek',
    component: DataApotek,
    meta: {
        middleware: checkRoles(roles.adminOwnerApt)
    },
},
{
    path: '/apotek/:id/edit',
    name: 'Edit Apotek',
    component: EditApotek,
    meta: {
        middleware: checkRoles(roles.ownerApotek)
    }
},

{
    path: '/apotek',
    children: [
        {
            path: 'grouping_produk',
            name: 'Grouping Produk',
            component: GroupingProduk,
            meta: {
                middleware: checkRoles(roles.adminOwnerApt)
            }
        },
        {
            path: 'grouping_produk/:id/edit',
            name: 'Edit Data Grouping',
            component: EditGroupingProduk,
            meta: {
                middleware: checkRoles(roles.ownerApotek)
            }
        },
        {
            path: 'produk_apotek/:id',
            name: 'Produk Apotek',
            component: ProdukApotek,
            meta: {
                middleware: checkRoles(roles.adminOwnerApt)
            }
        },
        {
            path: 'produk_apotek/:profilApotek/:id/edit',
            name: 'Edit Produk Apotek',
            component: EditProdukApotek,
            meta: {
                middleware: checkRoles(roles.adminApotek)
            }
        },
        {
            path: 'create',
            name: 'Tambah Apotek',
            component: TambahApotek,
            meta: {
                middleware: checkRoles(roles.ownerApotek)
            }
        },
    ]
},
]