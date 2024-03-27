import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs"
import {CookieService} from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private tipoTemperaturaSubject = new BehaviorSubject<boolean>(true) //true = Celsius, false = Fahrenheit
  tipoTemperatura$ = this.tipoTemperaturaSubject.asObservable() //Observable para que los componentes se suscriban a los cambios

  constructor(private cookie:CookieService) { }

  ngOnInit(){
    let tipo = this.cookie.get("tipoTemperatura")
    if(tipo === ""){
      this.cookie.set("tipoTemperatura","true")
    }
    let tipoBool = tipo === "true" ? true : false
    this.tipoTemperaturaSubject.next(tipoBool)
  }

  setTemperatura(tipo: boolean){
    if(tipo === true){
      console.log("cambio a Celsius")
    }else{
      console.log("cambio a Fahrenheit")
    }
    this.tipoTemperaturaSubject.next(tipo)
    this.cookie.set("tipoTemperatura",tipo.toString())

  
    
  }

  

}
