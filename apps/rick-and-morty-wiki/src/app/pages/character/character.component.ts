import { Component, OnInit, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CharactersSubjectService } from '../../signalsStateServices/characters.signals.service';
import { FrameComponent } from '../../components/frame/frame.component';
import { CharacterComponent } from '../../components/character/character.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormsModule } from '@angular/forms';
import { ICharacter } from '../../services/dtos/models/characters';

@Component({
  selector: 'app-character-page',
  standalone: true,
  templateUrl: './character.component.html',
  styleUrl: './character.component.scss',
  imports: [
    CommonModule,
    FrameComponent,
    CharacterComponent,
    FormsModule,
    InfiniteScrollModule,
  ],
})
export class CharacterPageComponent implements OnInit {
  readonly charactersState = inject(CharactersSubjectService);
  quantityCharacters: number = 20;
  routeId: string = '';
  character = () => this.charactersState.charactersSelected();

  filterInput = '';
  filterCharacters!: ICharacter[];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.getRouteId();
    this.getById(this.routeId);
  }

  getById(id: string): void {
    this.charactersState.getById(id);
    this.scrollToTop();
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onScrollByLastCharacter() {
    this.filterInput == '' && this.nextPage();
  }

  nextPage(): void {
    this.charactersState.nextPage();
    this.quantityCharacters += 20;
  }

  changeInput(): void {
    const searchCharacters: ICharacter[] = this.charactersState
      .charactersAll()
      .filter((el) =>
        el.name.toLowerCase().includes(this.filterInput.toLowerCase())
      );

    this.filterCharacters = searchCharacters;
  }

  getRouteId(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id !== null) {
        this.routeId = id;
      } else {
        this.router.navigate(['/404']);
      }
    });
  }

  countEps(arrayEps: Array<any>): number {
    return arrayEps.length;
  }
}
