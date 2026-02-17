import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { ListSidebarComponent } from "./list-sidebar.component";

describe("ListSidebarComponent", () => {
    let component: ListSidebarComponent;
    let fixture: ComponentFixture<ListSidebarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ListSidebarComponent,
                RouterTestingModule,
                HttpClientTestingModule,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(ListSidebarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
