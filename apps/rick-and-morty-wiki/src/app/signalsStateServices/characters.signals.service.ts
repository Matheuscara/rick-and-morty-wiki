import {
  Injectable,
  Signal,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { CharactersService } from '../services/characters.service';
import {
  CharacterMockExample,
  ICharacter,
} from '../services/dtos/models/characters';
import { IgetAllResponseDTO } from '../services/dtos/characters/getAll.response.dto';
import { IInfo } from '../services/dtos/models/info';
import { Router } from '@angular/router';

interface StateCharacters {
  charactersAll: Signal<ICharacter[]>;
  info: Signal<IInfo>;
  initialized: Signal<boolean>;
  charactersSelected: Signal<ICharacter>;
}

@Injectable({
  providedIn: 'root',
})
export class CharactersSubjectService implements StateCharacters {
  private charactersSerivce = inject(CharactersService);
  private router = inject(Router);

  private initialized$ = signal<boolean>(false);
  private charactersAll$ = signal<ICharacter[]>([]);
  private charactersSelected$ = signal<ICharacter>(CharacterMockExample);
  private info$ = signal<IInfo>({
    count: 0,
    next: '',
    pages: 0,
    prev: '',
  });

  initialized = computed(() => this.initialized$());
  charactersAll = computed(() => this.charactersAll$());
  charactersSelected = computed(() => this.charactersSelected$());
  info = computed(() => this.info$());

  init = effect(() => {
    !this.initialized() && this.loadInitAllCharacters();
  });

  public async loadInitAllCharacters(): Promise<void> {
    const page = 1
    const getAllResponse: IgetAllResponseDTO = await lastValueFrom(
      this.charactersSerivce.getAll(page)
    );
    this.info$.update(() => getAllResponse.info);
    this.charactersAll$.update(() => getAllResponse.results);
    this.initialized$.update(() => true);
    this.nextPage();
  }

  public async nextPage(): Promise<void> {
    const page = this.info$().next.split('=')[1];
    const nextPage: IgetAllResponseDTO = await lastValueFrom(
      this.charactersSerivce.getAll(Number(page))
    );
    this.info$.update(() => nextPage.info);
    this.charactersAll$.update(() => [...this.charactersAll$(), ...nextPage.results]);
  }

  public async getById(characterId: string): Promise<void> {
    const characterExist = this.returnCharacterById(Number(characterId));
    if (characterExist) {
      this.charactersSelected$.update(() => characterExist);

    } else {
      await lastValueFrom(this.charactersSerivce.getById(characterId)).then(
        (response) => {
          this.charactersSelected$.update(() => response);
        },
        () => {
          this.router.navigate(['/404']);
        }
      );
    }
  }

  private returnCharacterById(characterId: number): ICharacter | undefined {
    return this.charactersAll().find(
      (character) => character.id === characterId
    );
  }
}
