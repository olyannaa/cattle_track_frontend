import { IUser } from './userType';

export function getUserOrgId() {
    if (localStorage.getItem('user')) {
        const user: IUser = JSON.parse(localStorage.getItem('user') || '');
        return user?.organizationId;
    }
    return '';
}
