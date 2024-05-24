import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ListFooterComponent } from "./list-footer.component";

describe("ListFooterComponent", () => {
    let component: ListFooterComponent;
    let fixture: ComponentFixture<ListFooterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ListFooterComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ListFooterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
