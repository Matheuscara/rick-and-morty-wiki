import { Component, OnChanges, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICharacter } from '../../services/dtos/models/characters';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-character',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './character.component.html',
  styleUrl: './character.component.scss',
})
export class CharacterComponent implements OnChanges {
  caractersSlice = [] as ICharacter[];
  caracters = input.required<ICharacter[]>();
  unity = input<number>(0);
  seeAll = input<boolean>(true);
  eventName = output<string>();

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnChanges(): void {
    if (this.unity() != 0) {
      this.caractersSlice = this.caracters().slice(0, this.unity());
    } else {
      this.caractersSlice = this.caracters();
    }
  }

  redirectToCharacter(id: number): void {
    if(this.router.url.includes('personagem')) {
      this.eventName.emit(id.toString());
    }
    this.router.navigate([`/personagem/${id}`]);
  }

  redirectCharacters() {
    this.router.navigate([`/personagem/${1}`]);
  }

  redirectLocalization(url: string) {
    const urlLocation = url.split('location/')[1]
    console.log(urlLocation)
    this.router.navigate([`/localizations/${urlLocation}`]);
  }
}
