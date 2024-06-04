import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IgetAllResponseDTO } from './dtos/localization/getAll.response.dto';
import { IgetByIdResponseDTO } from './dtos/localization/getById.response.dto';
import { LocationMockExample } from './dtos/models/localizations';
import { InfoMock } from './dtos/models/info';
import { LocalizationService } from './localizations.service';

describe('LocalizationService', () => {
  let service: LocalizationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LocalizationService]
    });

    service = TestBed.inject(LocalizationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all locations', () => {
    const dummyLocations: IgetAllResponseDTO = {
      results: [LocationMockExample],
      info: InfoMock
    };

    service.getAll(1).subscribe(locations => {
      expect(locations.results.length).toBe(2);
      expect(locations.results).toEqual(dummyLocations.results);
    });

    const req = httpMock.expectOne(`${service.url}?page=1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyLocations);
  });

  it('should fetch location by id', () => {
    const dummyLocation: IgetByIdResponseDTO = LocationMockExample

    service.getById('1').subscribe(location => {
      expect(location).toEqual(dummyLocation);
    });

    const req = httpMock.expectOne(`${service.url}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyLocation);
  });
});
