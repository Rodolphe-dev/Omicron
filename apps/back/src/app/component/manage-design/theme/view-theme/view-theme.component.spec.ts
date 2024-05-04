import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewThemeComponent } from './view-theme.component';

describe('ViewThemeComponent', () => {
  let component: ViewThemeComponent;
  let fixture: ComponentFixture<ViewThemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewThemeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
