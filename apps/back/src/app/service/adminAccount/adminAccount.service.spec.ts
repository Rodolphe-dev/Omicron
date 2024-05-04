import { TestBed } from '@angular/core/testing';

import { AdminAccountService } from './adminAccount.service';

describe('AdminAccountService', () => {
  let service: AdminAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
