import {ActivatedRouteSnapshot, DetachedRouteHandle, BaseRouteReuseStrategy} from '@angular/router';

export class CustomRouteReuseStrategy implements BaseRouteReuseStrategy {
    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        throw new Error('Method not implemented.');
    }
    store(route: ActivatedRouteSnapshot, detachedTree: DetachedRouteHandle): void {
        throw new Error('Method not implemented.');
    }
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        throw new Error('Method not implemented.');
    }
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
        throw new Error('Method not implemented.');
    }
    public shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        return false;
    }
}