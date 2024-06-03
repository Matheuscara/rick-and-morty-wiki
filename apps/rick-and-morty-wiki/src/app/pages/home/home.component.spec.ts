import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { CharacterComponent } from '../../components/character/character.component';
import { localizationComponent } from '../../components/localizations/localization.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { LocationMockExample } from '../../services/dtos/models/localizations';
import { CharacterMockExample } from '../../services/dtos/models/characters';
import { CharactersService } from '../../services/characters.service';
import { InfoMock } from '../../services/dtos/models/info';
import { LocalizationService } from '../../services/localizations.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        CharacterComponent,
        localizationComponent,
        HomeComponent,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({
              get: (name: string) => '1', // Mocking route paramMap
            }),
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
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should character state be initialize with state', () => {
    expect(component.charactersState.charactersAll()[0].name).toBe(
      CharacterMockExample.name
    );
  });

  it('Should localizations state be initialize with state', () => {
    expect(component.localizationState.localizationsAll()[0].name).toBe(
      LocationMockExample.name
    );
  });

  it('Should unity characters', () => {
    expect(component.unityCharacters()).toBe(8);
  });

  it('Should unity localizations', () => {
    expect(component.unityLocalizations()).toBe(10);
  });
});
