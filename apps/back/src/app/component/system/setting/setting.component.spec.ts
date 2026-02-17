import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { SettingComponent } from "./setting.component";

describe("SettingComponent", () => {
    let component: SettingComponent;
    let fixture: ComponentFixture<SettingComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                SettingComponent,
                RouterTestingModule,
                HttpClientTestingModule,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(SettingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
