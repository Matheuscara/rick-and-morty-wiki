import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { CharactersSubjectService } from './signalsStateServices/characters.signals.service';

import { FooterComponent } from "./components/footer/footer.component";
import { LocalizationsSubjectService } from './signalsStateServices/localizations.signals.service';

@Component({
    standalone: true,
    providers: [CharactersSubjectService, LocalizationsSubjectService],
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterModule, NavBarComponent, FooterComponent]
})
export class AppComponent {
}
