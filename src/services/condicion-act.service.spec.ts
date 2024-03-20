import { TestBed } from '@angular/core/testing';

import { CondicionActService } from './condicion-act.service';

describe('CondicionActService', () => {
  let service: CondicionActService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CondicionActService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
