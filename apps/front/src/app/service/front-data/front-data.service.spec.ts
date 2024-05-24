import { TestBed } from "@angular/core/testing";

import { FrontDataService } from "./front-data.service";

describe("FrontDataService", () => {
    let service: FrontDataService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(FrontDataService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
