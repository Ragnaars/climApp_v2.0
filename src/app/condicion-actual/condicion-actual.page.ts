import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CondicionActService } from 'src/services/condicion-act.service';
import { ObtenerLocalidadService } from 'src/services/obtener-localidad.service';
import { Geolocation, Position, PositionOptions } from '@capacitor/geolocation';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { register } from 'swiper/element/bundle';
import { Subscription } from 'rxjs';
import {ColeccionCiudadesService} from "../../services/coleccionCiudades/coleccion-ciudades.service";
register()






@Component({
  selector: 'app-condicion-actual',
  templateUrl: './condicion-actual.page.html',
  styleUrls: ['./condicion-actual.page.scss'],
})



export class CondicionActualPage implements OnInit {

  // VARIABLES
  ciudadesAgregadas: string[] = [];
  ciudadesAgregadasSubscription!: Subscription;
  coordenadas: any;
  distanciaMinima = Infinity;
  puntoMasCercano: any;
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);
  codigoLocalidad: any;
  nombreLocalidad: any;
  datosPronosLocalidad: any;
  objetoCondicion: any;
  condicionTexto: any
  ciudades: any;
  currentPage: number = 1;
  cidudadesPerPage: number = 10
  pronosticos: any;
  codigoCiudad: any;
  Math: any;
  vientoDireccion: any;
  vientoFuerza: any;
  iconoViento: any;
  vientoCondicion : any
  fechaActualizado: any;
  expanded = true;
  horasDias = ["00:00", "06:00", "12:00", "18:00"]
  isLoading = true;

  

  constructor(
    private condicion: CondicionActService,
    private pronosticoLocalidad: ObtenerLocalidadService,
    private router: Router,
    private coleccionCiudades: ColeccionCiudadesService) {
    // Llama a infiniteScrollCiudades aquí para que se cargue la lista de ciudades al iniciar la aplicación
    this.obtenerUbicacionActual();
    this.infiniteScrollCiudades();

  }


  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.ciudadesAgregadasSubscription = this.coleccionCiudades.ciudadesAgregadas$.subscribe(ciudades => {
      this.ciudadesAgregadas = ciudades;
      console.log('Array de ciudades actualizado:', this.ciudadesAgregadas);
    });
    
    // Llama a obtenerUbicacionActual aquí
        // Obtén el elemento de la imagen
  }

  ngOnDestroy(): void {
    // Asegúrate de desuscribirte para evitar memory leaks
    this.ciudadesAgregadasSubscription.unsubscribe();
  }

  //FUNCIONES PARA OBTENER UBICACION ACTUAL Y PRONOSTICO DE LOCALIDAD MAS CERCANA

  // Función para obtener la ubicación actual
  async obtenerUbicacionActual() {
    try {
      const opciones: PositionOptions = {
        enableHighAccuracy: true,
        timeout: 10000,
      };
      const posicion: Position = await Geolocation.getCurrentPosition(opciones);
      // Asigna las coordenadas obtenidas a la variable coordenadas
      this.coordenadas = {
        latitude: posicion.coords.latitude,
        longitude: posicion.coords.longitude
      };
      //DESPUES DE OBTENER LAS COORDENADAS:
      // Coloca la lógica que depende de las coordenadas aquí
      this.obtenerLocalicacionMasCercana();
      console.log('Ubicación obtenida aqui:', this.coordenadas);
    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
    }
  }


  // Función para convertir grados a radianes
  toRadians(degrees: number) {
    return degrees * (Math.PI / 180);
  }


  // Función para calcular la distancia entre dos puntos en la Tierra
  haversine(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371; // Radio de la Tierra en kilómetros
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distancia en kilómetros
    return d;
  }

  // Función para obtener la localidad más cercana
  obtenerLocalicacionMasCercana() {
    this.condicion.getDataLocalidad().subscribe((localidad) => {
      this.ciudades = localidad;
      console.log("ciudades", this.ciudades);

      // Itera sobre el arreglo de localidades
      localidad.forEach((element: { latitud: number; longitud: number; }) => {
        // Calcula la distancia entre la ubicación actual y cada localidad
        const distancia = this.haversine(-74,-75.6997211, element.latitud, element.longitud)

        // Compara la distancia con this.distanciaMinima y actualiza si es menor
        if (distancia < this.distanciaMinima) {
          this.distanciaMinima = distancia;
          this.puntoMasCercano = element;
          console.log('Punto más cercano:', this.puntoMasCercano, " con distancia de : ", this.distanciaMinima);
        }
      })

      console.log("finalmente la distancia minima es: ", this.distanciaMinima, "En la localidad de : ", this.puntoMasCercano);
      this.codigoLocalidad = this.puntoMasCercano.codigo;

      // Llama a obtenerDatosPronostico aquí gracias a que ya se tiene el código de la localidad más cercana
      this.obtenerDatosPronostico();
    });
  }

  // Función para obtener los datos del pronóstico de la localidad más cercana 

  obtenerDatosPronostico() {
    this.isLoading = true; // Activar indicador de carga
    
    this.pronosticoLocalidad.obtenerLocalidadCompleta(this.codigoLocalidad)
      .subscribe((localidad) => {
        this.datosPronosLocalidad = localidad.data[0];
        this.pronosticos = this.datosPronosLocalidad.pronostico;
        this.nombreLocalidad = this.datosPronosLocalidad.nombre;
        this.objetoCondicion = this.datosPronosLocalidad.condicionActual;
        this.fechaActualizado = this.objetoCondicion.timestamp; 
        this.vientoFuerza = parseInt(this.objetoCondicion.vientoFuerza);
        this.vientoDireccion = parseInt(this.objetoCondicion.vientoDireccion);
        this.iconoViento = this.obtenerIconoDireccionViento();
        this.condicionTexto = this.objetoCondicion.condicionTexto.toLowerCase().replace(/\s/g, '');
        
        console.log("objeto condicion", this.objetoCondicion);
        console.log("condicion texto", this.condicionTexto);
        console.log("pronostico localidad", this.datosPronosLocalidad);
        console.log("datos", localidad);
  
        this.isLoading = false; // Desactivar indicador de carga cuando se completan los datos
      },
      (error) => {
        this.isLoading = false; // Desactivar indicador de carga en caso de error
        console.error('Error al obtener datos del pronóstico', error);
      });
  }

  

  obtenerIconoDireccionViento(){
    if(this.vientoDireccion == 0 && this.vientoFuerza == 0){
      this.vientoCondicion = 'calma';
      return 'assets/iconosviento/calma.png';
    }else{
      if(this.vientoDireccion>348){
        this.vientoCondicion = 'N';
        return 'assets/iconosviento/n.png';
      }
      else if(this.vientoDireccion>326){
        this.vientoCondicion = 'NNO';
        return 'assets/iconosviento/nno.png';
      }
      else if(this.vientoDireccion>303){
        this.vientoCondicion = 'NO';
        return 'assets/iconosviento/no.png';
      }
      else if(this.vientoDireccion>282){
        this.vientoCondicion = 'ONO';
        return 'assets/iconosviento/ono.png';
      }
      else if(this.vientoDireccion>258){
        this.vientoCondicion = 'O';
        return 'assets/iconosviento/o.png';
      }
      else if(this.vientoDireccion>236){
        this.vientoCondicion ='OSO';
        return 'assets/iconosviento/oso.png';
      }
      else if(this.vientoDireccion>213){
      this.vientoCondicion = 'SO';
        return 'assets/iconosviento/so.png';
      }
      else if(this.vientoDireccion>191){
        this.vientoCondicion = 'SSO';
        return 'assets/iconosviento/sso.png';
      }
      else if(this.vientoDireccion>168){
        this.vientoCondicion = 'S';
        return 'assets/iconosviento/s.png';
      }
      else if(this.vientoDireccion>146){
        this.vientoCondicion = 'SSE';
        return 'assets/iconosviento/sse.png';
      }
      else if(this.vientoDireccion>123){
        this.vientoCondicion = 'SE';
        return 'assets/iconosviento/se.png';
      }
      else if(this.vientoDireccion>101){
        this.vientoCondicion = 'ESE';
        return 'assets/iconosviento/ese.png';
      }
      else if(this.vientoDireccion>78){
        this.vientoCondicion = 'E';
        return 'assets/iconosviento/e.png';
      }
      else if(this.vientoDireccion>56){
        this.vientoCondicion = 'ENE';
        return 'assets/iconosviento/ene.png';
      }
      else if(this.vientoDireccion>33){
        this.vientoCondicion = 'NE';
        return 'assets/iconosviento/ne.png';
      }
      else if(this.vientoDireccion>11){
        this.vientoCondicion = 'NNE';
        return 'assets/iconosviento/nne.png';
      }
      else {
        this.vientoCondicion = 'N';
        return 'assets/iconosviento/n.png';
      }
  }
}

obtenerDatosCiudadesFavs(){
  this.ciudadesAgregadas.forEach((codCiudad: any) => {
    this.pronosticoLocalidad.obtenerLocalidadCompleta(codCiudad)
    .subscribe((localidad : any) =>{
      console.log("localidades favoritas");

    })
  })
}




  //FUNCIONES PARA LISTA DE CIUDADES  
  //FUNCIONES PARA LISTA DE CIUDADES  
  //FUNCIONES PARA LISTA DE CIUDADES  
  //FUNCIONES PARA LISTA DE CIUDADES   
  //FUNCIONES PARA LISTA DE CIUDADES  
  //FUNCIONES PARA LISTA DE CIUDADES  

  infiniteScrollCiudades(event?: any) {
    this.condicion.getDataLocalidad().subscribe((localidad) => {
      this.ciudades = localidad;
      setTimeout(() => {
        for (let i = 0; i < this.cidudadesPerPage; i++) {
          if (this.ciudades.length < localidad.length) {
            this.ciudades.push(localidad[this.ciudades.length]);
          }
        }
        if (event) {
          event.target.complete(); // Mark the end of the data loading operation
        }
      }, 1000); // Simulate a 1-second delay to load the data

      this.currentPage++; // Increment the page number for the next load
    });
  }

  // Función que se llama al seleccionar una ciudad y obtener su pronóstico
  seleccionarCiudad(ciudad: any) {
    this.codigoCiudad = ciudad.codigo; // Almacena el código de la ciudad seleccionada
    this.router.navigate(['/ciudad', ciudad.codigo]); // Navega a la página de Ciudad con el código de la ciudad como parámetro
  }

  redondearTemperatura() {
    return Math.floor(this.objetoCondicion.temperatura);
  }

  toggleAccordion() {
    this.expanded = !this.expanded;
  }


}
