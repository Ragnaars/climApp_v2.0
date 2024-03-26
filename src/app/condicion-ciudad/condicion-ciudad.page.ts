import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ObtenerLocalidadService } from 'src/services/obtener-localidad.service';
import { ColeccionCiudadesService } from "../../services/coleccionCiudades/coleccion-ciudades.service"
import { Router } from '@angular/router';


interface AccordionItem {
  content: [];
}

@Component({
  selector: 'app-condicion-ciudad',
  templateUrl: './condicion-ciudad.page.html',
  styleUrls: ['./condicion-ciudad.page.scss'],
})
export class CondicionCiudadPage implements OnInit {
  isOpen = false;
  codigoCiudad: any; // Variable para almacenar el código de la ciudad
  datosPronosLocalidad: any; // Variable para almacenar los datos del pronóstico de la localidad
  nombreLocalidad: any; // Variable para almacenar el nombre de la localidad
  objetoCondicion: any; // Variable para almacenar el objeto de condición actual del pronóstico
  condicionTexto: any; // Variable para almacenar el texto de la condición actual del pronóstico
  pronosticos: any; // Variable para almacenar los pronósticos de la localidad
  vientoDireccion: any;
  vientoFuerza: any;
  iconoViento: any;
  vientoCondicion: any
  fechaActualizado: any;
  expanded = true;
  horasDias = ["00:00", "06:00", "12:00", "18:00"]
  isLoading = true;


  constructor(
    private route: ActivatedRoute, // Inyección del servicio ActivatedRoute para obtener parámetros de la URL
    private router: Router, // Inyección del servicio Router para la navegación
    private coleccionCiudadesService: ColeccionCiudadesService,
    private pronosticoLocalidad: ObtenerLocalidadService // Inyección del servicio para obtener el pronóstico de la localidad
  ) { }

  alertButtons = ['Action'];

  ngOnInit() {
    // Suscripción a cambios en los parámetros de la URL
    this.route.params.subscribe(params => {
      // Recibe el código de la ciudad de los parámetros de la URL
      this.codigoCiudad = params['codigo'];
      console.log(this.codigoCiudad);
      // Llama a la función para obtener los datos del pronóstico al recibir el código de la ciudad
      this.obtenerDatosPronostico();
    });
  }

  // Función para obtener los datos del pronóstico de la localidad
  obtenerDatosPronostico() {
    this.isLoading = true; // Activar indicador de carga

    this.pronosticoLocalidad.obtenerLocalidadCompleta(this.codigoCiudad)
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

  redondearTemperatura() {
    return Math.floor(this.objetoCondicion.temperatura);
  }

  obtenerIconoDireccionViento() {
    if (this.vientoDireccion == 0 && this.vientoFuerza == 0) {
      this.vientoCondicion = 'calma';
      return 'assets/iconosviento/calma.png';
    } else {
      if (this.vientoDireccion > 348) {
        this.vientoCondicion = 'N';
        return 'assets/iconosviento/n.png';
      }
      else if (this.vientoDireccion > 326) {
        this.vientoCondicion = 'NNO';
        return 'assets/iconosviento/nno.png';
      }
      else if (this.vientoDireccion > 303) {
        this.vientoCondicion = 'NO';
        return 'assets/iconosviento/no.png';
      }
      else if (this.vientoDireccion > 282) {
        this.vientoCondicion = 'ONO';
        return 'assets/iconosviento/ono.png';
      }
      else if (this.vientoDireccion > 258) {
        this.vientoCondicion = 'O';
        return 'assets/iconosviento/o.png';
      }
      else if (this.vientoDireccion > 236) {
        this.vientoCondicion = 'OSO';
        return 'assets/iconosviento/oso.png';
      }
      else if (this.vientoDireccion > 213) {
        this.vientoCondicion = 'SO';
        return 'assets/iconosviento/so.png';
      }
      else if (this.vientoDireccion > 191) {
        this.vientoCondicion = 'SSO';
        return 'assets/iconosviento/sso.png';
      }
      else if (this.vientoDireccion > 168) {
        this.vientoCondicion = 'S';
        return 'assets/iconosviento/s.png';
      }
      else if (this.vientoDireccion > 146) {
        this.vientoCondicion = 'SSE';
        return 'assets/iconosviento/sse.png';
      }
      else if (this.vientoDireccion > 123) {
        this.vientoCondicion = 'SE';
        return 'assets/iconosviento/se.png';
      }
      else if (this.vientoDireccion > 101) {
        this.vientoCondicion = 'ESE';
        return 'assets/iconosviento/ese.png';
      }
      else if (this.vientoDireccion > 78) {
        this.vientoCondicion = 'E';
        return 'assets/iconosviento/e.png';
      }
      else if (this.vientoDireccion > 56) {
        this.vientoCondicion = 'ENE';
        return 'assets/iconosviento/ene.png';
      }
      else if (this.vientoDireccion > 33) {
        this.vientoCondicion = 'NE';
        return 'assets/iconosviento/ne.png';
      }
      else if (this.vientoDireccion > 11) {
        this.vientoCondicion = 'NNE';
        return 'assets/iconosviento/nne.png';
      }
      else {
        this.vientoCondicion = 'N';
        return 'assets/iconosviento/n.png';
      }
    }
  }
  toggleAccordion() {
    this.expanded = !this.expanded;
  }


  seleccionarCiudad(ciudad: any) {
    this.router.navigate(['/condicion-ciudad', ciudad.codigo]);
  }

  agregarCiudad(codigoCiudad: any) {
    this.coleccionCiudadesService.agregarCiudad(codigoCiudad);
  }

  eliminarCiudad(codCiudad: any) {
    this.coleccionCiudadesService.eliminarCiudad(codCiudad);
  }



}
