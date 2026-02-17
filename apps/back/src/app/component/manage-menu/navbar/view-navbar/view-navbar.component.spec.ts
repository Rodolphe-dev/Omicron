import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { ViewNavbarComponent } from "./view-navbar.component";

describe("ViewNavbarComponent", () => {
    let component: ViewNavbarComponent;
    let fixture: ComponentFixture<ViewNavbarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ViewNavbarComponent,
                RouterTestingModule,
                HttpClientTestingModule,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(ViewNavbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
