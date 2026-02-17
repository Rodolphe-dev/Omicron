import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { EditNavbarComponent } from "./edit-navbar.component";

describe("EditNavbarComponent", () => {
    let component: EditNavbarComponent;
    let fixture: ComponentFixture<EditNavbarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                EditNavbarComponent,
                RouterTestingModule,
                HttpClientTestingModule,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(EditNavbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
