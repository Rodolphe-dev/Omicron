import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AddThemeComponent } from "./add-theme.component";

describe("AddThemeComponent", () => {
    let component: AddThemeComponent;
    let fixture: ComponentFixture<AddThemeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                AddThemeComponent,
                RouterTestingModule,
                HttpClientTestingModule,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(AddThemeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
