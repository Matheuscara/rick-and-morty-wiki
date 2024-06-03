import { Component, Inject, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalizationsSubjectService } from '../../signalsStateServices/localizations.signals.service';
import { ILocation } from '../../services/dtos/models/localizations';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { localizationComponent } from '../../components/localizations/localization.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-localizations',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    localizationComponent,
    InfiniteScrollModule,
  ],
  templateUrl: './localizations.component.html',
  styleUrl: './localizations.component.scss',
})
export class LocalizationsPageComponent implements OnInit {
  readonly localizationState = inject(LocalizationsSubjectService);
  quantityLocalizations: number = 20;
  routeId: string = '';
  localization = () => this.localizationState.localizationSelected();
  filterInput = '';
  filterLocalization!: ILocation[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    @Inject('Window') private window: Window
  ) {}

  ngOnInit(): void {
    this.getRouteId();
    this.getById(this.routeId);
  }

  getById(id: string): void {
    this.localizationState.getById(id);
    this.scrollToTop();
  }

  scrollToTop() {
    this.window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onScrollByLastLocalization() {
    this.filterInput == '' && this.nextPage();
  }

  nextPage(): void {
    this.localizationState.nextPage();
    this.quantityLocalizations += 20;
  }

  changeInput(): void {
    const searchLocalization: ILocation[] = this.localizationState
      .localizationsAll()
      .filter((el) =>
        el.name.toLowerCase().includes(this.filterInput.toLowerCase())
      );

    this.filterLocalization = searchLocalization;
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

  counResidents(arrayEps: Array<any>): number {
    return arrayEps.length;
  }
}
