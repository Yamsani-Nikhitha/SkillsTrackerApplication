import { TestBed } from '@angular/core/testing';

import { SkillsTrackerService } from './skills-tracker.service';

describe('SkillsTrackerService', () => {
  let service: SkillsTrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkillsTrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
