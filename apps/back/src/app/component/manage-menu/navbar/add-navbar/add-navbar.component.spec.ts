import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AddNavbarComponent } from "./add-navbar.component";
describe("AddNavbarComponent", () => {
    let component: AddNavbarComponent;
    let fixture: ComponentFixture<AddNavbarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                AddNavbarComponent,
                RouterTestingModule,
                HttpClientTestingModule,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(AddNavbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
