// lista-peliculas.component.ts
import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../peliculas.service';
import { Pelicula } from '../pelicula.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-lista-peliculas',
  templateUrl: './lista-peliculas.component.html',
  styleUrls: ['./lista-peliculas.component.css']
})
export class ListaPeliculasComponent implements OnInit {
  peliculas: Pelicula[] = [];
  peliculasFiltradas: Pelicula[] = [];
  generos: string[] = [];
  filtroGenero: string = '';
  filtroNombre: string = '';
  filtroDescripcion: string = '';

  constructor(private peliculasService: PeliculasService,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.obtenerPeliculas();
  }

  obtenerPeliculas(): void {
    this.http.get<any>('./assets/peliculas.json')
    this.peliculasService.obtenerPeliculas()
      .subscribe((data: any) => {
        console.log('Datos obtenidos:',data);
        this.peliculas = data.movies;
        this.generos = data.genres;
      }, error => {
        console.error('Error al obtener las películas', error);
      });
  }

  filtrarPeliculas(): void {
    this.peliculasFiltradas = this.peliculas.filter(pelicula => {
      let cumpleGenero = true;
      let cumpleNombre = true;
      let cumpleDescripcion = true;

      if (this.filtroGenero && this.filtroGenero.length > 0) {
        cumpleGenero = this.filtroGenero.includes(pelicula.genre);
      }

      if (this.filtroNombre) {
        cumpleNombre = pelicula.title.toLowerCase().includes(this.filtroNombre.toLowerCase());
      }

      if (this.filtroDescripcion) {
        cumpleDescripcion = pelicula.description.toLowerCase().includes(this.filtroDescripcion.toLowerCase());
      }

      return cumpleGenero && cumpleNombre && cumpleDescripcion;
    });
  }
}