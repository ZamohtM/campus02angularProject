import { TestBed } from '@angular/core/testing';

import { RecessionService } from './recession.service';

describe('RecessionService', () => {
  let service: RecessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
