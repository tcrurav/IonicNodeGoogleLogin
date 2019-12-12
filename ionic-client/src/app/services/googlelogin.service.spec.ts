import { TestBed } from '@angular/core/testing';

import { GoogleloginService } from './googlelogin.service';

describe('GoogleloginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GoogleloginService = TestBed.get(GoogleloginService);
    expect(service).toBeTruthy();
  });
});
