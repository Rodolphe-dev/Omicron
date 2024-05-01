export interface INavbar {
    id: number;
    parent: boolean | null | undefined;
    parentName?: string | null | undefined;
    name: string | null | undefined;
    status: boolean|null|undefined;
    url: string | null | undefined;
    inParent: boolean | null | undefined;
    children: INavbar[];
}
