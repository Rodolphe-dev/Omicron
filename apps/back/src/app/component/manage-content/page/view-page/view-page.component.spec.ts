import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { ViewPageComponent } from "./view-page.component";

describe("ViewPageComponent", () => {
    let component: ViewPageComponent;
    let fixture: ComponentFixture<ViewPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ViewPageComponent,
                RouterTestingModule,
                HttpClientTestingModule,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(ViewPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
