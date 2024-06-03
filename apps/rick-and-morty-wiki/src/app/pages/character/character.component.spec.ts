import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterPageComponent } from './character.component';
import { HttpClientModule } from '@angular/common/http';
import { CharactersSubjectService } from '../../signalsStateServices/characters.signals.service';
import { of } from 'rxjs';
import { CharactersService } from '../../services/characters.service';
import { InfoMock } from '../../services/dtos/models/info';
import { CharacterMockExample } from '../../services/dtos/models/characters';
import { LocalizationService } from '../../services/localizations.service';
import { LocationMockExample } from '../../services/dtos/models/localizations';
import { ActivatedRoute } from '@angular/router';

describe('CharacterPageComponent', () => {
  let component: CharacterPageComponent;
  let fixture: ComponentFixture<CharacterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterPageComponent, HttpClientModule],
      providers: [
        CharactersSubjectService,
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
              get: () => '1', // Mocking route paramMap
            }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterPageComponent);
    component = fixture.componentInstance;
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
    const spyOnGetById = jest.spyOn(component.charactersState, 'getById')
    const spyOnScrollToTop = jest.spyOn(component, 'scrollToTop')

    component.getById('1');

    expect(spyOnGetById).toHaveBeenCalledWith('1');
    expect(spyOnScrollToTop).toHaveBeenCalled();
  })

  it('onScrollByLastCharacter should call to nextPage with a filterInput equal ""', () => {
    const spyOnNextPage = jest.spyOn(component, 'nextPage')
    component.filterInput = '';

    component.onScrollByLastCharacter();

    expect(spyOnNextPage).toHaveBeenCalled();
  })

  it('onScrollByLastCharacter not be call to nextPage with a filterInput equal ""', () => {
    const spyOnNextPage = jest.spyOn(component, 'nextPage')
    component.filterInput = 'teste';

    component.onScrollByLastCharacter();

    expect(spyOnNextPage).toHaveBeenCalledTimes(0);
  })

  it('nextPage to be call to charactersState.nextPage and a quantityCharacters updated', () => {
    const spyOnCharactersStateNextPage = jest.spyOn(component.charactersState, 'nextPage')
    const quantityCharacters = component.quantityCharacters;

    component.nextPage();

    expect(spyOnCharactersStateNextPage).toHaveBeenCalled();
    expect(quantityCharacters).toEqual(20);
  })

  it('changeInput should be a filter array', () => {
    component.filterInput = 'not';

    component.changeInput();

    expect(component.filterCharacters).toEqual([])
  })

  it('countEps should return a number residents', () => {
    const test = ['1','2','3','4']

    const results = component.countEps(test)

    expect(results).toBe(4);
  })

});
