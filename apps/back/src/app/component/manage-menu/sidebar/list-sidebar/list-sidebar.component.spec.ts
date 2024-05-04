import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListSidebarComponent } from './list-sidebar.component';

describe('ListSidebarComponent', () => {
  let component: ListSidebarComponent;
  let fixture: ComponentFixture<ListSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListSidebarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
