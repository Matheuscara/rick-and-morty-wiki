import { Observable } from 'rxjs';
import { IgetAllResponseDTO } from '../dtos/characters/getAll.response.dto';
import { IgetAllResponseDTO as IgetLocationsAllResponseDTO } from '../dtos/localization/getAll.response.dto';
import { IgetByIdResponseDTO } from '../dtos/characters/getById.response.dto';
import { IgetByIdResponseDTO as localizationIgetByIdResponseDTO } from '../dtos/localization/getById.response.dto';

export abstract class ApiRickAndMorty {
  abstract getAll(
    _page: number
  ): Observable<IgetAllResponseDTO | IgetLocationsAllResponseDTO>;
  abstract getById(
    id: string
  ): Observable<IgetByIdResponseDTO | localizationIgetByIdResponseDTO>;
}
