import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ObtenerLocalidadService {

  url = 'https://archivos.meteochile.gob.cl/dmc-movil/api/v1/localidad/';
  constructor(private http: HttpClient) { }

  obtenerLocalidadCompleta(codigoRegion: string) {
    const noCacheUrl = `${this.url}${codigoRegion}/pronostico?_t=${new Date().getTime()}`;
    const resultado  = this.http.get<any>(noCacheUrl);
    return resultado;
  }

buscarPronosticoPorCodigo(codigo: string): Observable<any> {
  const noCacheUrl = `${this.url}${codigo}/pronostico?_t=${new Date().getTime()}`;
  return this.http.get<any>(noCacheUrl);
}
  
}
