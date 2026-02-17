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

export interface JSONldListSidebar {
    "hydra:member": Sidebar[];
    "hydra:totalItems": number;
    "hydra:view": HydraView;
    "hydra:search": HydraSearch;
}

export interface HydraMember {
    "@context": string;
    "@id": string;
    "@type": string;
    id: number;
    name: string;
    status: boolean;
    items: string[];
}

export interface HydraSearch {
    "@type": string;
    "hydra:template": string;
    "hydra:variableRepresentation": string;
    "hydra:mapping": HydraMapping[];
}

export interface HydraMapping {
    "@type": string;
    variable: string;
    property: string;
    required: boolean;
}

export interface HydraView {
    "@id": string;
    type: string;
    "hydra:first": string;
    "hydra:last": string;
    "hydra:previous": string;
    "hydra:next": string;
}
