import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { NavbarService } from "./navbar.service";

describe("NavbarService", () => {
    let service: NavbarService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });
        service = TestBed.inject(NavbarService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
