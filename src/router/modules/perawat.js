import IndexPerawat from '@/views/perawat/IndexPerawat.vue'
import { checkRoles, roles } from '../../middleware/redirect';
import UpdatePerawat from '@/views/perawat/UpdatePerawat.vue'
export default [{
    path: '/perawat',
    name: 'Perawat',
    component: IndexPerawat,
    meta: {
        middleware: checkRoles(roles.admin)
    }
},
{
    path: '/perawat',
    children: [
        {
            path: ':id',
            name: 'Update Nomor STRP Perawat',
            component: UpdatePerawat,
            meta: {
                middleware: checkRoles(roles.admin)
            }
        }
    ]
}

]