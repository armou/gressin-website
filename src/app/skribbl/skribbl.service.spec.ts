import { TestBed } from '@angular/core/testing';

import { SkribblService } from './skribbl.service';

describe('SkribblService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SkribblService = TestBed.get(SkribblService);
    expect(service).toBeTruthy();
  });
});
