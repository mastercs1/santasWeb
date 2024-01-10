import { TestBed } from '@angular/core/testing';

import { PreferenceServiceService } from './preference-service.service';

describe('PreferenceServiceService', () => {
  let service: PreferenceServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreferenceServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
