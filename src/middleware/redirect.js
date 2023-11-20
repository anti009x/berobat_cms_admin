import Cookies from "js-cookie";

export function checkRoles(allowRoles) {
    return function (to, from, next) {
        const user = JSON.parse(Cookies.get('user'));
        const roles = user?.data?.getRole?.idRole || null;
        const canAccess = roles && allowRoles.includes(roles);
        canAccess ? next() : next({ name: 'Dashboard' });
    }
}

export const roles = {
    admin: ["RO-2003061"],
    dokter: ["RO-2003062"],
    perawat: ["RO-2003063"],
    ownerApotek: ["RO-2003065"],
    adminRs: ["RO-2003066"],
    adminOwnerApt: ["RO-2003061", "RO-2003065", "RO-2003067"],
    adminDokter: ["RO-2003061", "RO-2003062"],
    adminRsadminWeb: ["RO-2003066", "RO-2003061"],
    adminApotek: ["RO-2003067"]
};
