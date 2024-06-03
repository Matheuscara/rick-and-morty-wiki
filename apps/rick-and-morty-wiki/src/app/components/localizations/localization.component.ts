import { Component, OnChanges, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ILocation } from '../../services/dtos/models/localizations';

@Component({
  selector: 'app-localization',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './localization.component.html',
  styleUrl: './localization.component.scss',
})
export class localizationComponent implements OnChanges {
  localizationSlice = [] as ILocation[];
  localization = input.required<ILocation[]>();
  unity = input<number>(0);
  seeAll = input<boolean>(true);
  eventName = output<string>();

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnChanges(): void {
    if (this.unity() != 0) {
      this.localizationSlice = this.localization().slice(0, this.unity());
    } else {
      this.localizationSlice = this.localization();
    }
  }

  redirectToLocalization(id: number): void {
    if(this.router.url.includes('localizations')) {
      this.eventName.emit(id.toString());
    }
    this.router.navigate([`/localizations/${id}`]);
  }

  redirectLocalization() {
    this.router.navigate([`/localizations/${1}`]);
  }
}
