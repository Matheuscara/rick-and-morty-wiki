import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CharactersService } from './characters.service';
import { IgetAllResponseDTO } from './dtos/characters/getAll.response.dto';
import { IgetByIdResponseDTO } from './dtos/characters/getById.response.dto';
import { CharacterMockExample } from './dtos/models/characters';
import { InfoMock } from './dtos/models/info';

describe('CharactersService', () => {
  let service: CharactersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CharactersService]
    });

    service = TestBed.inject(CharactersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all characters', () => {
    const dummyCharacters: IgetAllResponseDTO = {
      results: [CharacterMockExample],
      info: InfoMock
    };

    service.getAll(1).subscribe(characters => {
      expect(characters.results.length).toBe(2);
      expect(characters.results).toEqual(dummyCharacters.results);
    });

    const req = httpMock.expectOne(`${service.url}?page=1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyCharacters);
  });

  it('should fetch character by id', () => {
    const dummyCharacter: IgetByIdResponseDTO = CharacterMockExample

    service.getById('1').subscribe(character => {
      expect(character).toEqual(dummyCharacter);
    });

    const req = httpMock.expectOne(`${service.url}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyCharacter);
  });
});
