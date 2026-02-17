import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { ListFooterComponent } from "./list-footer.component";

describe("ListFooterComponent", () => {
    let component: ListFooterComponent;
    let fixture: ComponentFixture<ListFooterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ListFooterComponent,
                RouterTestingModule,
                HttpClientTestingModule,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(ListFooterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
