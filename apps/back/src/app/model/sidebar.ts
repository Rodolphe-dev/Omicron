export interface ISidebar {
    id: number;
    parent: boolean|null|undefined;
    subParent: boolean|null|undefined;
    parentName?: string|null|undefined;
    subParentName?: string|null|undefined;
    name: string|null|undefined;
    url: string|null|undefined;
    inParent: boolean|null|undefined;
    inSubParent: boolean|null|undefined;
    children: ISidebar[];
}