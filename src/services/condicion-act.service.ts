import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CondicionActService {

  private cachedData: any;
  apiCondicion = 'https://archivos.meteochile.gob.cl/dmc-movil/localidad/getAll';


  constructor(private http: HttpClient) { }

  getDataLocalidad(): Observable<any> {
    if (this.cachedData) {
      return of(this.cachedData);
    } else {
      return this.http.get<any>(this.apiCondicion).pipe(
        tap(data => {
          // Asigna las ciudades y sus pronósticos al cachedData
          this.cachedData = data.map((ciudad: any) => ({
            ...ciudad,
            pronostico: null // Inicialmente no tenemos el pronóstico
          }));
        }),
        catchError(error => {
          console.log('error', error);
          return of(null);
        })
      );
    }
  }

  refrescarInformacionDeLocalidad(): Observable<any> {
    return this.http.get<any>(this.apiCondicion).pipe(
      tap(data => this.cachedData = data),
      catchError(error => {
        console.log('error', error);
        return of(null);
      })
    )
  }

}
