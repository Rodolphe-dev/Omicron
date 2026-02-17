import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { EditThemeComponent } from "./edit-theme.component";

describe("EditThemeComponent", () => {
    let component: EditThemeComponent;
    let fixture: ComponentFixture<EditThemeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                EditThemeComponent,
                RouterTestingModule,
                HttpClientTestingModule,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(EditThemeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
