import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AddAdminComponent } from "./add-admin.component";

describe("AddAdminComponent", () => {
    let component: AddAdminComponent;
    let fixture: ComponentFixture<AddAdminComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                AddAdminComponent,
                RouterTestingModule,
                HttpClientTestingModule,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(AddAdminComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
