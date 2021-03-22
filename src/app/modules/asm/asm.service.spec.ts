/* tslint:disable:no-unused-variable */

import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { AsmService } from './asm.service';

describe('Service: Asm', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AsmService]
    });
  });

  it('should ...', inject([AsmService], (service: AsmService) => {
    expect(service).toBeTruthy();
  }));
});
