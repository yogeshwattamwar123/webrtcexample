import { TestBed } from '@angular/core/testing';

import { DynamicscriptloaderService } from './dynamicscriptloader.service';

describe('DynamicscriptloaderService', () => {
  let service: DynamicscriptloaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicscriptloaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
