import IndexDokter from './modules/dokter'
import IndexPerawat from './modules/perawat'
import Konsumen from './modules/konsumen'
import MasterData from './modules/master'
import Apotek from './modules/apotek'
import AutentikasiLogin from './modules/auth'
import NotFound from '../views/not-found/page404.vue'
import ProfilePage from './modules/profile'
const routes = [
    ...IndexDokter,
    ...IndexPerawat,
    ...Konsumen,
    ...MasterData,
    ...Apotek,
    ...AutentikasiLogin,
    ...ProfilePage,
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('../views/main-content/IndexDashboard.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      component: NotFound
    }
]

export default routes