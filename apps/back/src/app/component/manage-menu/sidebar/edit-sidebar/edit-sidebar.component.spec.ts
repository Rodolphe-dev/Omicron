import { ComponentFixture, TestBed } from "@angular/core/testing";
import { EditSidebarComponent } from "./edit-sidebar.component";

describe("EditSidebarComponent", () => {
    let component: EditSidebarComponent;
    let fixture: ComponentFixture<EditSidebarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [EditSidebarComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(EditSidebarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
