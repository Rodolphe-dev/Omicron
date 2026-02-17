import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AddPageComponent } from "./add-page.component";

describe("AddPageComponent", () => {
    let component: AddPageComponent;
    let fixture: ComponentFixture<AddPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                AddPageComponent,
                RouterTestingModule,
                HttpClientTestingModule,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(AddPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
