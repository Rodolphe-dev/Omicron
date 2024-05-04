import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddNavbarComponent } from './add-navbar.component';
describe('AddNavbarComponent', () => {
  let component: AddNavbarComponent;
  let fixture: ComponentFixture<AddNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNavbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
