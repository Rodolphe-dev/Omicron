export interface IAdminAccount {
    id: number;
    username: string|null|undefined;
    email: string|null|undefined;
    password: string|null|undefined;
    superadmin: boolean|null|undefined;
}
