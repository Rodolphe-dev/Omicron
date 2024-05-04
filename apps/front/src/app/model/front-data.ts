export interface IFrontData {
    navbar:  INavbar;
    sidebar: ISidebar;
    footer:  Footer;
    setting: Setting;
    page:    Page;
}

export interface INavbar {
    id:     number;
    name:   string;
    status: boolean;
    items:  INavbarItems[];
}

export interface INavbarItems {
    id: number;
    parent: boolean | null | undefined;
    parentName?: string | null | undefined;
    name: string | null | undefined;
    url: string | null | undefined;
    inParent: boolean | null | undefined;
    children: INavbarItems[];
}

export interface ISidebar {
    id:     number;
    name:   string;
    status: boolean;
    items:  ISidebarItems[];
}

export interface ISidebarItems {
    id: number;
    parent: boolean|null|undefined;
    subParent: boolean|null|undefined;
    parentName?: string|null|undefined;
    subParentName?: string|null|undefined;
    name: string|null|undefined;
    url: string|null|undefined;
    inParent: boolean|null|undefined;
    inSubParent: boolean|null|undefined;
    children: ISidebarItems[];
}

export interface Footer {
    name:    string;
    status:  boolean;
    content: string;
}

export interface Page {
    name:    string;
    route:   string;
    content: string;
}

export interface Setting {
    nameApp:           string;
    statusMaintenance: boolean;
}
