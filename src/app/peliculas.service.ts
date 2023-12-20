import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pelicula } from './pelicula.model';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {
  private apiUrl = './assets/peliculas.json';

  constructor(private http: HttpClient) { }

  obtenerPeliculas(): Observable<Pelicula[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}

