import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocalizationsPageComponent } from './localizations.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { LocalizationsSubjectService } from '../../signalsStateServices/localizations.signals.service';
import { CharactersService } from '../../services/characters.service';
import { CharacterMockExample } from '../../services/dtos/models/characters';
import { LocalizationService } from '../../services/localizations.service';
import { InfoMock } from '../../services/dtos/models/info';
import { LocationMockExample } from '../../services/dtos/models/localizations';

describe('LocalizationsPageComponent', () => {
  let component: LocalizationsPageComponent;
  let fixture: ComponentFixture<LocalizationsPageComponent>;
  let localizationsSubjectService: LocalizationsSubjectService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocalizationsPageComponent, HttpClientModule],
      providers: [
        LocalizationsSubjectService,
        {
          provide: 'Window',
          useValue: {
            scrollTo: () => of({}),
          },
        },
        {
          provide: CharactersService,
          useValue: {
            getAll: () =>
              of({
                info: InfoMock,
                results: [CharacterMockExample],
              }),
          },
        },

        {
          provide: LocalizationService,
          useValue: {
            getAll: () =>
              of({
                info: InfoMock,
                results: [LocationMockExample],
              }),
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({
              get: (name: string) => '1', // Mocking route paramMap
            }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LocalizationsPageComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    localizationsSubjectService = TestBed.inject(LocalizationsSubjectService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ngOnInit request routeId and getById', () => {
    const spyOnGetRouteId = jest.spyOn(component, 'getRouteId')
    const spyOnGetById = jest.spyOn(component, 'getById')

    component.ngOnInit()

    expect(spyOnGetRouteId).toHaveBeenCalled();
    expect(spyOnGetById).toHaveBeenCalledWith(component.routeId);
  });

  it('should getById request a character state and srollTotol', () => {
    const spyOnGetById = jest.spyOn(component.localizationState, 'getById')
    const spyOnScrollToTop = jest.spyOn(component, 'scrollToTop')

    component.getById('1');

    expect(spyOnGetById).toHaveBeenCalledWith('1');
    expect(spyOnScrollToTop).toHaveBeenCalled();
  })

  it('onScrollByLastLocalization should call to nextPage with a filterInput equal ""', () => {
    const spyOnNextPage = jest.spyOn(component, 'nextPage')
    component.filterInput = '';

    component.onScrollByLastLocalization();

    expect(spyOnNextPage).toHaveBeenCalled();
  })

  it('onScrollByLastLocalization not be call to nextPage with a filterInput equal ""', () => {
    const spyOnNextPage = jest.spyOn(component, 'nextPage')
    component.filterInput = 'teste';

    component.onScrollByLastLocalization();

    expect(spyOnNextPage).toHaveBeenCalledTimes(0);
  })

  it('nextPage to be call to localizationState.nextPage and a quantityLocalizations updated', () => {
    const spyOnLocalizationStateNextPage = jest.spyOn(component.localizationState, 'nextPage')
    const quantityLocalizations = component.quantityLocalizations;

    component.nextPage();

    expect(spyOnLocalizationStateNextPage).toHaveBeenCalled();
    expect(quantityLocalizations).toEqual(20);
  })

  it('changeInput should be a filter array', () => {
    component.filterInput = 'not';

    component.changeInput();

    expect(component.filterLocalization).toEqual([])
  })

  it('counResidents should return a number residents', () => {
    const test = [1,2,3,4]

    const results = component.counResidents(test)

    expect(results).toBe(4);
  })
});
