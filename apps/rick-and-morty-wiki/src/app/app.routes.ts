import { Route } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CharacterPageComponent } from './pages/character/character.component';
import { LocalizationsPageComponent } from './pages/localizations/localizations.component';

export const appRoutes: Route[] = [
     {
        path: '',
        component: HomeComponent
     },
     {
      path: 'personagem/:id',
      component: CharacterPageComponent
     },
     {
      path: 'localizations/:id',
      component: LocalizationsPageComponent
     },
       {
         path: '**',
         redirectTo: ''
       }
];
