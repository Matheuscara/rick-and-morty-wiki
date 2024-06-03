import {
  Injectable,
  Signal,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IInfo } from '../services/dtos/models/info';
import { Router } from '@angular/router';
import { ILocation, LocationMockExample } from '../services/dtos/models/localizations';
import { LocalizationService } from '../services/localizations.service';
import { IgetAllResponseDTO } from '../services/dtos/localization/getAll.response.dto';

interface StateLocalization {
  localizationsAll: Signal<ILocation[]>;
  info: Signal<IInfo>;
  initialized: Signal<boolean>;
  localizationSelected: Signal<ILocation>;
}

@Injectable({
  providedIn: 'root',
})
export class LocalizationsSubjectService implements StateLocalization {
  private localizationService = inject(LocalizationService);
  private router = inject(Router);

  private initialized$ = signal<boolean>(false);
  private localizationsAll$ = signal<ILocation[]>([]);
  private localizationSelected$ = signal<ILocation>(LocationMockExample);
  private info$ = signal<IInfo>({
    count: 0,
    next: '',
    pages: 0,
    prev: '',
  });

  initialized = computed(() => this.initialized$());
  localizationsAll = computed(() => this.localizationsAll$());
  localizationSelected = computed(() => this.localizationSelected$());
  info = computed(() => this.info$());

  init = effect(() => {
    !this.initialized() && this.loadInitAllLocalizations();
  });

  public async loadInitAllLocalizations(): Promise<void> {
    const page = 1
    const getAllResponse: IgetAllResponseDTO = await lastValueFrom(
      this.localizationService.getAll(page)
    );
    this.info$.update(() => getAllResponse.info);
    this.localizationsAll$.update(() => getAllResponse.results);
    this.initialized$.update(() => true);
    this.nextPage();
  }

  public async nextPage(): Promise<void> {
    const page = this.info$().next.split('=')[1];
    const nextPage: IgetAllResponseDTO = await lastValueFrom(
      this.localizationService.getAll(Number(page))
    );
    this.info$.update(() => nextPage.info);
    this.localizationsAll$.update(() => [...this.localizationsAll$(), ...nextPage.results]);
  }

  public async getById(localId: string): Promise<void> {
    const localizationExist = this.returnLocalizationById(Number(localId));
    if (localizationExist) {
      this.localizationSelected$.update(() => localizationExist);

    } else {
      await lastValueFrom(this.localizationService.getById(localId)).then(
        (response) => {
          this.localizationSelected$.update(() => response);
        },
        (error) => {
          this.router.navigate(['/404']);
        }
      );
    }
  }

  private returnLocalizationById(localId: number): ILocation | undefined {
    return this.localizationsAll().find(
      (character) => character.id === localId
    );
  }
}
