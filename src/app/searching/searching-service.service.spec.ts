import { TestBed } from '@angular/core/testing';

import { SearchingServiceService } from './searching-service.service';

describe('SearchingServiceService', () => {
  let service: SearchingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
