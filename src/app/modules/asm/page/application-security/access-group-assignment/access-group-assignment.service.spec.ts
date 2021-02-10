/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AccessGroupAssignmentService } from '../../../../../data/services/access-group-assignment.service';

describe('Service: AccessGroupAssignment', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccessGroupAssignmentService],
    });
  });

  it('should ...', inject(
    [AccessGroupAssignmentService],
    (service: AccessGroupAssignmentService) => {
      expect(service).toBeTruthy();
    }
  ));
});
