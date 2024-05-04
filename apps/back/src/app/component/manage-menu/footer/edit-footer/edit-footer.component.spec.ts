import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditFooterComponent } from './edit-footer.component';

describe('EditFooterComponent', () => {
  let component: EditFooterComponent;
  let fixture: ComponentFixture<EditFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditFooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

