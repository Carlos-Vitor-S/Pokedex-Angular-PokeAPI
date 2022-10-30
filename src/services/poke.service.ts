import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { InPokemon } from 'src/app/interfaces/in-pokemon';
@Injectable({
  providedIn: 'root',
})
export class PokeService {
  constructor(private http: HttpClient) {}

  getResult() {
    return this.http.get(`${environment.baseUrl}`, { observe: 'response' });
  }

  getPokemonById(id: number): Observable<HttpResponse<InPokemon>> {
    return this.http.get<InPokemon>(`${environment.baseUrl}/${id}`, {
      observe: 'response',
    });
  }

  getPokemonByName(name: string): Observable<HttpResponse<InPokemon>> {
    return this.http.get<InPokemon>(`${environment.baseUrl}/${name}`, {
      observe: 'response',
    });
  }
}
