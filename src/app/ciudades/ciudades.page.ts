import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CondicionActService } from 'src/services/condicion-act.service';
import { ObtenerLocalidadService } from 'src/services/obtener-localidad.service';
import { ColeccionCiudadesService } from "../../services/coleccionCiudades/coleccion-ciudades.service";

@Component({
  selector: 'app-ciudades',
  templateUrl: './ciudades.page.html',
  styleUrls: ['./ciudades.page.scss'],
})
export class CiudadesPage implements OnInit {
  ciudades: any;
  codigoCiudadSeleccionada: any; // Variable para almacenar el código de la ciudad seleccionada
  nombreCiudadSeleccionada: any;
  ciudadesFiltradas: any; // Variable para almacenar las ciudades filtradas

  constructor(
    private condicion: CondicionActService,
    private obtenerLocalidadService: ObtenerLocalidadService,
    private router: Router,
    private route: ActivatedRoute,
    private coleccionCiudadesService: ColeccionCiudadesService
  ) { }

  ngOnInit() {
    this.Ciudades();
  }

  Ciudades() {
    this.condicion.getDataLocalidad().subscribe((localidad: any) => {
      this.ciudades = localidad;
      this.ordenarCiudadesPorLatitud();
      this.ciudadesFiltradas = [...this.ciudades]; // Inicializar las ciudades filtradas
    });
  }

  ordenarCiudadesPorLatitud() {
    this.ciudades.sort((a: { latitud: number; }, b: { latitud: number; }) => a.latitud - b.latitud); // Ordenar de norte a sur
  }

  filtrarCiudades(event: any) {
    const query = event.target.value.toLowerCase();
    this.ciudadesFiltradas = this.ciudades.filter((ciudad: any) => {
      return ciudad.nombre.toLowerCase().indexOf(query) > -1;
    });
  }

  seleccionarCiudad(ciudad: any) {
    this.router.navigate(['/condicion-ciudad', ciudad.codigo]);
  }

  // agregarCiudad(codigoCiudad : any){
  //   this.coleccionCiudadesService.agregarCiudad(codigoCiudad);
  // }

  // eliminarCiudad(codCiudad:any){
  //   this.coleccionCiudadesService.eliminarCiudad(codCiudad);
  // }
}