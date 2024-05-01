/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FrontDataService } from './front-data.service';

describe('Service: FrontData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FrontDataService]
    });
  });

  it('should ...', inject([FrontDataService], (service: FrontDataService) => {
    expect(service).toBeTruthy();
  }));
});
