import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { ListPageComponent } from "./list-page.component";

describe("ListPageComponent", () => {
    let component: ListPageComponent;
    let fixture: ComponentFixture<ListPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ListPageComponent,
                RouterTestingModule,
                HttpClientTestingModule,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(ListPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
