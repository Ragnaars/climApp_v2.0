import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CondicionActService } from 'src/services/condicion-act.service';

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
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.Ciudades(); // Llama al método Ciudades() cuando el componente se inicializa

    // Suscripción a cambios en los parámetros de la URL
    this.route.params.subscribe(params => {
      // Recibe el código de la ciudad de los parámetros de la URL
      this.codigoCiudadSeleccionada = params['codigo'];
      console.log(this.codigoCiudadSeleccionada);
    });
  }

  Ciudades() {
    this.condicion.getDataLocalidad().subscribe((localidad) => {
      this.ciudades = localidad;
      this.ciudadesFiltradas = [...localidad]; // Inicializar las ciudades filtradas con todas las ciudades
      console.log(localidad);
    });
  }

  // Función para filtrar las ciudades según la entrada del usuario
  filtrarCiudades(event: any) {
    const query = event.target.value.toLowerCase();
    this.ciudadesFiltradas = this.ciudades.filter((ciudad: any) => {
      return ciudad.nombre.toLowerCase().indexOf(query) > -1;
    });
  }

  seleccionarCiudad(ciudad: any) {
    this.codigoCiudadSeleccionada = ciudad.codigo; // Almacena el código de la ciudad seleccionada
    this.router.navigate(['/condicion-ciudad', ciudad.codigo]); // Navega a la página de Ciudad con el código de la ciudad como parámetro
  }
}