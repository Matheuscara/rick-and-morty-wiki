import { Injectable } from '@angular/core';
import { ApiRickAndMorty } from './apis/rickAndMorty.api';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IgetAllResponseDTO } from './dtos/characters/getAll.response.dto';
import { IgetByIdResponseDTO } from './dtos/characters/getById.response.dto';

@Injectable({
  providedIn: 'root',
})
export class CharactersService extends ApiRickAndMorty {
  url: string;

  constructor(private http: HttpClient) {
    super();
    // TODO - Implement env variables
    this.url = 'https://rickandmortyapi.com/api/character';
  }

  public override getAll(_page: number): Observable<IgetAllResponseDTO> {
    const url = `${this.url}?page=${_page}`;
    return this.http.get<IgetAllResponseDTO>(url);
  }

  public override getById(id: string): Observable<IgetByIdResponseDTO> {
    return this.http.get<IgetByIdResponseDTO>( `${this.url}/${id}`);
  }
}
