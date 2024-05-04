export interface IPage {
    id: number;
    name: string|null|undefined;
    route: string|null|undefined;
    content: string|null|undefined;
}

export interface JSONldListPage {
    "hydra:member":     IPage[];
    "hydra:totalItems": number;
    "hydra:view":       HydraView;
    "hydra:search":     HydraSearch;
}

export interface HydraMember {
    "@context": string;
    "@id":      string;
    "@type":    string;
    id:         number;
    name:       string;
    route:      string;
    content:    string;
}

export interface HydraSearch {
    "@type":                        string;
    "hydra:template":               string;
    "hydra:variableRepresentation": string;
    "hydra:mapping":                HydraMapping[];
}

export interface HydraMapping {
    "@type":  string;
    variable: string;
    property: string;
    required: boolean;
}

export interface HydraView {
    "@id":            string;
    type:             string;
    "hydra:first":    string;
    "hydra:last":     string;
    "hydra:previous": string;
    "hydra:next":     string;
}