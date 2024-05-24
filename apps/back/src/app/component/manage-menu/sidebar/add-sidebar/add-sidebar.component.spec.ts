import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AddSidebarComponent } from "./add-sidebar.component";

describe("AddSidebarComponent", () => {
    let component: AddSidebarComponent;
    let fixture: ComponentFixture<AddSidebarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AddSidebarComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(AddSidebarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
