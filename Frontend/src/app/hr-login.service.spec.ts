import { TestBed } from '@angular/core/testing';

import { HrLoginService } from './hr-login.service';

describe('HrLoginService', () => {
  let service: HrLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HrLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
