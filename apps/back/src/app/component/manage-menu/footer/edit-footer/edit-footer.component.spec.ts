import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { EditFooterComponent } from "./edit-footer.component";

describe("EditFooterComponent", () => {
    let component: EditFooterComponent;
    let fixture: ComponentFixture<EditFooterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                EditFooterComponent,
                RouterTestingModule,
                HttpClientTestingModule,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(EditFooterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
