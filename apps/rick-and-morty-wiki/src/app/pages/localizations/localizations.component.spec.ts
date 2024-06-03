import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocalizationsComponent } from './localizations.component';

describe('LocalizationsComponent', () => {
  let component: LocalizationsComponent;
  let fixture: ComponentFixture<LocalizationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocalizationsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LocalizationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
