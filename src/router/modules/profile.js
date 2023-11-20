import ProfileAdmin from '../../views/update-profil/ProfileAdmin.vue'
import ProfileDokter from '../../views/update-profil/ProfileDokter.vue'
import ProfilePerawat from '../../views/update-profil/ProfilePerawat.vue'
import ProfileOwnerApt from '../../views/update-profil/ProfileOwnerApt.vue'
import ProfileRs from '../../views/update-profil/ProfileAdminRs.vue'
import ChangePassword from '../../views/update-profil/ChangePassword.vue'
import { checkRoles, roles } from '../../middleware/redirect';

export default[
{
    path: '/profile_admin',
    name: 'Update Profile Admin',
    component: ProfileAdmin,
    meta: {
        middleware: checkRoles(roles.admin)
    }
},
{
    path: '/profile_dokter',
    name: 'Update Profile Dokter',
    component: ProfileDokter,
    meta: {
        middleware: checkRoles(roles.dokter)
    }
},
{
    path: '/profile_perawat',
    name: 'Update Profile Perawat',
    component: ProfilePerawat,
    meta: {
        middleware: checkRoles(roles.perawat)
    }
},
{
    path: '/profile_owner_apotek',
    name: 'Update Profile Apotek',
    component: ProfileOwnerApt,
    meta: {
        middleware: checkRoles(roles.ownerApotek)
    }
},
{
    path: '/profile_owner_rs',
    name: 'Update Profile Owner Rs',
    component: ProfileRs,
    meta: {
        middleware: checkRoles(roles.adminRs)
    }
},
{
    path: '/change_password',
    name: 'Change Password',
    component: ChangePassword
}]