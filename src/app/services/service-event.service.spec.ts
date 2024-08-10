import { TestBed } from '@angular/core/testing';

import { ServiceEventService } from './service-event.service';

describe('ServiceEventService', () => {
  let service: ServiceEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
