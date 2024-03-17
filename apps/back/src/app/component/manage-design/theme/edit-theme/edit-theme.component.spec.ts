/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditThemeComponent } from './edit-theme.component';

describe('EditThemeComponent', () => {
  let component: EditThemeComponent;
  let fixture: ComponentFixture<EditThemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditThemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
