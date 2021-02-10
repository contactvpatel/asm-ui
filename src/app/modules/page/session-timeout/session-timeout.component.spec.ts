/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SessionTimeoutComponent } from './session-timeout.component';

describe('SessionTimeoutComponent', () => {
  let component: SessionTimeoutComponent;
  let fixture: ComponentFixture<SessionTimeoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionTimeoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionTimeoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
