import { TestBed } from '@angular/core/testing';

import { NgxStateSignalService } from './ngx-state-signal.service';

describe('NgxStateSignalService', () => {
  let service: NgxStateSignalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxStateSignalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
