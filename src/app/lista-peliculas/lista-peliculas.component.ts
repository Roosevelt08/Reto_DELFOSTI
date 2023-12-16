import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-lista-peliculas',
  templateUrl: './lista-peliculas.component.html',
  styleUrls: ['./lista-peliculas.component.css']
})
export class ListaPeliculasComponent implements OnInit {

  @Input() pelicula: any; // Asegúrate de tener esta línea para definir la propiedad de entrada pelicula
  peliculas: any[] = [];

  constructor(private http: HttpClient) { }

  listaPeliculas = [
    { titulo: 'Pelicula 1', director: 'Director 1' },
    { titulo: 'Pelicula 2', director: 'Director 2' },
    // ... más películas
  ];

  ngOnInit() {
    this.http.get('assets/peliculas.json').subscribe((data: any) => {
      this.peliculas = data; // Asignar los datos recuperados a this.peliculas
    });
  }

  buscarPeliculas(event: Event) {
    const valor = (event.target as HTMLInputElement)?.value;
    if (valor !== null && valor !== undefined) {
      // Lógica para buscar películas con el valor proporcionado
    }
  }
}

