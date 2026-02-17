import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { FooterService } from "./footer.service";

describe("FooterService", () => {
    let service: FooterService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });
        service = TestBed.inject(FooterService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
