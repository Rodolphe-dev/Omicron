export interface FrontData {
    navbar: Navbar;
    sidebar: Sidebar;
    footer: Footer;
    setting: Setting;
    page: Page;
}

export interface Navbar {
    id: number;
    name: string;
    status: boolean;
    items: NavbarItems[];
}

export interface NavbarItems {
    id: number;
    parent: boolean | null | undefined;
    parentName?: string | null | undefined;
    name: string | null | undefined;
    url: string | null | undefined;
    inParent: boolean | null | undefined;
    children: NavbarItems[];
}

export interface Sidebar {
    id: number;
    name: string;
    status: boolean;
    items: SidebarItems[];
}

export interface SidebarItems {
    id: number;
    parent: boolean | null | undefined;
    subParent: boolean | null | undefined;
    parentName?: string | null | undefined;
    subParentName?: string | null | undefined;
    name: string | null | undefined;
    url: string | null | undefined;
    inParent: boolean | null | undefined;
    inSubParent: boolean | null | undefined;
    children: SidebarItems[];
}

export interface Footer {
    name: string;
    status: boolean;
    content: string;
}

export interface Page {
    name: string;
    route: string;
    content: string;
}

export interface Setting {
    nameApp: string;
    statusMaintenance: boolean;
}
