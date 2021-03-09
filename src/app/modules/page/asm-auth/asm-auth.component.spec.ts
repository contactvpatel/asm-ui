/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AsmAuthComponent } from './asm-auth.component';

describe('AsmAuthComponent', () => {
  let component: AsmAuthComponent;
  let fixture: ComponentFixture<AsmAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AsmAuthComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsmAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
