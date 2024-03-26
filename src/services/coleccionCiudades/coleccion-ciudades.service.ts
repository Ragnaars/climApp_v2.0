import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ObtenerLocalidadService } from "../obtener-localidad.service"

@Injectable({
  providedIn: 'root'
})
export class ColeccionCiudadesService {



  private codCiudadesAgregadasSubject = new BehaviorSubject<string[]>([]);
  codCiudadesAgregadas$ = this.codCiudadesAgregadasSubject.asObservable();

  private ciudadesAgregadasSubject = new BehaviorSubject<any[]>([]);
  ciudadesAgregadas$ = this.ciudadesAgregadasSubject.asObservable();

  constructor(
    private obtenerLocalidadService: ObtenerLocalidadService
  ) { }

  agregarCiudad(codCiudad: any) {
    const ciudadesAgregadas = this.codCiudadesAgregadasSubject.getValue();
    if (ciudadesAgregadas.includes(codCiudad)) {
      alert("La ciudad ya se encuentra agregada");
    } else {
      console.log("Agregando ciudad", codCiudad);
      const ciudadesActuales = ciudadesAgregadas.filter(ciudad => ciudad !== codCiudad);
      const nuevasCiudades = [...ciudadesActuales, codCiudad];
      this.codCiudadesAgregadasSubject.next(nuevasCiudades);
      console.log("Agregada", codCiudad);
    }
  }

  eliminarCiudad(codCiudad: any) {
    const ciudadesAgregadas = this.codCiudadesAgregadasSubject.getValue();
    if (!ciudadesAgregadas.includes(codCiudad)) {
      alert("La ciudad no se encuentra agregada");
    } else {
      const nuevasCiudades = ciudadesAgregadas.filter(ciudad => ciudad !== codCiudad);
      console.log("nuevo array despues de eliminar", nuevasCiudades)
      this.codCiudadesAgregadasSubject.next(nuevasCiudades);
      console.log("Eliminada : ", codCiudad);
      alert("La ciudad " + codCiudad + " ha sido eliminada");
    }
  }

  obtenerCiudadesAgregadas() {
    this.codCiudadesAgregadas$.forEach((codCiudad: any) => {
      this.obtenerLocalidadService.obtenerLocalidadCompleta(codCiudad).subscribe((dataCiudad: any) => {
        console.log("Data Ciudad a enviar", dataCiudad[0].data[0]);
        const ciudadesAgregadas = this.ciudadesAgregadasSubject.getValue();
        const nuevasCiudades = [...ciudadesAgregadas, dataCiudad];
        this.ciudadesAgregadasSubject.next(nuevasCiudades);
      })
    })
  }


}
