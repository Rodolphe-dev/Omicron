import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { ViewFooterComponent } from "./view-footer.component";

describe("ViewFooterComponent", () => {
    let component: ViewFooterComponent;
    let fixture: ComponentFixture<ViewFooterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ViewFooterComponent,
                RouterTestingModule,
                HttpClientTestingModule,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(ViewFooterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
