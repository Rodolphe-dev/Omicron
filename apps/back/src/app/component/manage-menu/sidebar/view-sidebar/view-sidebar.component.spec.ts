import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ViewSidebarComponent } from "./view-sidebar.component";

describe("ViewSidebarComponent", () => {
    let component: ViewSidebarComponent;
    let fixture: ComponentFixture<ViewSidebarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ViewSidebarComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ViewSidebarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
