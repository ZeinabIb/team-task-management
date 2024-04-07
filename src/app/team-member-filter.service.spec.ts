import { TestBed } from '@angular/core/testing';

import { TeamMemberFilterService } from '../Services/TeamServices/team-member-filter.service';

describe('TeamMemberFilterService', () => {
  let service: TeamMemberFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamMemberFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
