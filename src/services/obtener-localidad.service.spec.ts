import { TestBed } from '@angular/core/testing';

import { ObtenerLocalidadService } from './obtener-localidad.service';

describe('ObtenerLocalidadService', () => {
  let service: ObtenerLocalidadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObtenerLocalidadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
