import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { ListAdminComponent } from "./list-admin.component";

describe("ListAdminComponent", () => {
    let component: ListAdminComponent;
    let fixture: ComponentFixture<ListAdminComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ListAdminComponent,
                RouterTestingModule,
                HttpClientTestingModule,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(ListAdminComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
