import { TestBed } from '@angular/core/testing';

import { ColeccionCiudadesService } from './coleccion-ciudades.service';

describe('ColeccionCiudadesService', () => {
  let service: ColeccionCiudadesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColeccionCiudadesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
