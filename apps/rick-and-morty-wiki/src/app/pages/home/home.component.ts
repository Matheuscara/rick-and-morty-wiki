import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterComponent } from '../../components/character/character.component';
import { CharactersSubjectService } from '../../signalsStateServices/characters.signals.service';
import { LocalizationsSubjectService } from '../../signalsStateServices/localizations.signals.service';
import { localizationComponent } from '../../components/localizations/localization.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    CommonModule,
    CharacterComponent,
    localizationComponent,  ],
})
export class HomeComponent {
  readonly unityCharacters = signal(8);
  readonly unityLocalizations = signal(10);
  readonly charactersState = inject(CharactersSubjectService);
  readonly localizationState = inject(LocalizationsSubjectService);
}
