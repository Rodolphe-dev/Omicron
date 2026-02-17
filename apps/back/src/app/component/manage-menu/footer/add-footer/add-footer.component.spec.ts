import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AddFooterComponent } from "./add-footer.component";

describe("AddFooterComponent", () => {
    let component: AddFooterComponent;
    let fixture: ComponentFixture<AddFooterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                AddFooterComponent,
                RouterTestingModule,
                HttpClientTestingModule,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(AddFooterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
