export interface AdminAccount {
    id: number;
    username: string | null | undefined;
    email: string | null | undefined;
    password: string | null | undefined;
    superadmin: boolean | null | undefined;
}

export interface JSONldListAdmin {
    "hydra:member": AdminAccount[];
    "hydra:totalItems": number;
    "hydra:view": HydraView;
    "hydra:search": HydraSearch;
}

export interface HydraMember {
    "@context": string;
    "@id": string;
    "@type": string;
    id: number;
    username: string;
    email: string;
    superadmin: boolean;
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
