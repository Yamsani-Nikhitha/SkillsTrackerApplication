import { TestBed } from '@angular/core/testing';

import { EditHRDetailsServiceService } from './edit-hrdetails-service.service';

describe('EditHRDetailsServiceService', () => {
  let service: EditHRDetailsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditHRDetailsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
