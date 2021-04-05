import { TestBed } from '@angular/core/testing';

import { CreateHrDetailsService } from './create-hr-details.service';

describe('CreateHrDetailsService', () => {
  let service: CreateHrDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateHrDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
