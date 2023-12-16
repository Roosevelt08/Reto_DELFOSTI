import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-lista-peliculas',
  templateUrl: './lista-peliculas.component.html',
  styleUrls: ['./lista-peliculas.component.css']
})
export class ListaPeliculasComponent implements OnInit {

  peliculas: any[] = [];
  generos: string[] = [];
  generoSeleccionado: string = 'Todos';
  nombreFiltro: string = '';
  descripcionFiltro: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('assets/peliculas.json').subscribe((data: any) => {
      this.peliculas = data.movies;
      this.generos = data.genre; // Asignar los datos recuperados a this.peliculas
    });
  }

   buscarPeliculas(event: Event) {
     const valor = (event.target as HTMLInputElement)?.value;
     if (valor !== null && valor !== undefined) {
       // Lógica para buscar películas con el valor proporcionado
     }
   }

   aplicarFiltros() {
    this.peliculas = this.peliculas.filter(pelicula => {
      const cumpleGenero = this.generoSeleccionado === 'Todos' || pelicula.genre === this.generoSeleccionado;
      const cumpleNombre = pelicula.title.toLowerCase().includes(this.nombreFiltro.toLowerCase());
      const cumpleDescripcion = pelicula.description.toLowerCase().includes(this.descripcionFiltro.toLowerCase());
      return cumpleGenero && cumpleNombre && cumpleDescripcion;
    });
  }
  
  
}

