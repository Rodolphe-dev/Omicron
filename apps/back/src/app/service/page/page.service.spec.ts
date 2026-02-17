import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { PageService } from "./page.service";

describe("PageService", () => {
    let service: PageService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });
        service = TestBed.inject(PageService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
