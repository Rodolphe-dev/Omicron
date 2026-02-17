import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { ListThemeComponent } from "./list-theme.component";

describe("ListThemeComponent", () => {
    let component: ListThemeComponent;
    let fixture: ComponentFixture<ListThemeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ListThemeComponent,
                RouterTestingModule,
                HttpClientTestingModule,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(ListThemeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
