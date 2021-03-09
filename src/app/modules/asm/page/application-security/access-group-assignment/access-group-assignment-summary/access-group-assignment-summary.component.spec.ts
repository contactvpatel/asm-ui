/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AccessGroupAssignmentSummaryComponent } from './access-group-assignment-summary.component';

describe('AccessGroupSummaryComponent', () => {
  let component: AccessGroupAssignmentSummaryComponent;
  let fixture: ComponentFixture<AccessGroupAssignmentSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccessGroupAssignmentSummaryComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessGroupAssignmentSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
