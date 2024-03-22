import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColeccionCiudadesService {

  private ciudadesAgregadasSubject = new BehaviorSubject<string[]>([]);
  ciudadesAgregadas$ = this.ciudadesAgregadasSubject.asObservable();
  constructor() { }

  agregarCiudad(codCiudad: any) {
    const ciudadesAgregadas = this.ciudadesAgregadasSubject.getValue();
    if (ciudadesAgregadas.includes(codCiudad)) {
      alert("La ciudad ya se encuentra agregada");
    } else {
      const nuevasCiudades = [...ciudadesAgregadas, codCiudad];
      this.ciudadesAgregadasSubject.next(nuevasCiudades);
      console.log("Agregada", codCiudad);
    }
  }

  eliminarCiudad(codCiudad: any) {
    const ciudadesAgregadas = this.ciudadesAgregadasSubject.getValue();
    if (!ciudadesAgregadas.includes(codCiudad)) {
      alert("La ciudad no se encuentra agregada");
    } else {
      const nuevasCiudades = ciudadesAgregadas.filter(ciudad => ciudad !== codCiudad);
      this.ciudadesAgregadasSubject.next(nuevasCiudades);
      console.log("Eliminada : ", codCiudad);
      alert("La ciudad " + codCiudad + " ha sido eliminada");
    }
  }


}
