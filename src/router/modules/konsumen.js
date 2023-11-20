import Konsumen from '@/views/konsumen/IndexKonsumen.vue'
import { checkRoles, roles } from '../../middleware/redirect';

export default [{
    path: '/konsumen',
    name: 'Konsumen',
    component: Konsumen,
    meta: {
        middleware: checkRoles(roles.admin)
    }
}]