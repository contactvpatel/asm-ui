/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AccessAssignmentGroupDetailComponent } from './access-group-assignment-detail.component';

describe('AccessGroupAssignmentDetailComponent', () => {
  let component: AccessAssignmentGroupDetailComponent;
  let fixture: ComponentFixture<AccessAssignmentGroupDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccessAssignmentGroupDetailComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessAssignmentGroupDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
