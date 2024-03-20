import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable, map } from 'rxjs';
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

  obtenerLocalidadCompletaConObservable(codigoRegion: string): Observable<any> {
    const noCacheUrl = `${this.url}${codigoRegion}/pronostico?_t=${new Date().getTime()}`;
    return this.http.get<any>(noCacheUrl).pipe(
      map((response: { data: any; }) => response.data) // Suponiendo que la lista de ciudades está en la propiedad "data" del objeto de respuesta
    );
  }

buscarPronosticoPorCodigo(codigo: string): Observable<any> {
  const noCacheUrl = `${this.url}${codigo}/pronostico?_t=${new Date().getTime()}`;
  return this.http.get<any>(noCacheUrl);
}

obtenerCoordenadasPorCodigo(codigo: string): Observable<any> {
  const noCacheUrl = `${this.url}${codigo}/coordenadas?_t=${new Date().getTime()}`;
  return this.http.get<any>(noCacheUrl);
}
  
}
