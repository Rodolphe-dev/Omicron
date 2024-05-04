import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListNavbarComponent } from './list-navbar.component';

describe('ListNavbarComponent', () => {
  let component: ListNavbarComponent;
  let fixture: ComponentFixture<ListNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListNavbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
