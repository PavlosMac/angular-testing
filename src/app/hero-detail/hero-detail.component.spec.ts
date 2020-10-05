import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {HeroDetailComponent} from './hero-detail.component';
import {ActivatedRoute} from '@angular/router';
import {HeroService} from '../services/hero.service';
import {of} from 'rxjs/internal/observable/of';
import {FormsModule} from '@angular/forms';
import {Location} from '@angular/common';


describe('HeroDetailComponent', () => {

  let mockActivatedRoute, mockHeroService, mockLocation;
  let fixture: ComponentFixture<HeroDetailComponent>;

  beforeEach(() => {

    mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
    mockLocation = jasmine.createSpyObj(['back']);

    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => {
            return '3';
          }
        }
      }
    };

    TestBed.configureTestingModule({
      declarations: [HeroDetailComponent],
      imports: [FormsModule],
      providers: [
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
        {provide: HeroService, useValue: mockHeroService},
        {provide: Location, useValue: mockLocation}
      ]
    });

    fixture = TestBed.createComponent(HeroDetailComponent);
    mockHeroService.getHero.and.returnValue(of({id: 3, name: 'SuperDude', strength: 11}));
  });

  it('should render h2 with returned hero from heroService.getHero', () => {

    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('h2').textContent).toContain('SUPERDUDE');
  });

  // it('should call updateHero when save is called', fakeAsync(() => {
  //   mockHeroService.updateHero.and.returnValue(of({}));
  //
  //   fixture.detectChanges();
  //   fixture.componentInstance.save();
  //
  //   tick(250); // flush() if not time dependent
  //
  //   expect(mockHeroService.updateHero).toHaveBeenCalled();
  // });

  it('should call updateHero when save is called', async(() => {
    mockHeroService.updateHero.and.returnValue(of({}));

    fixture.detectChanges();
    fixture.componentInstance.save();

    fixture.whenStable().then(() => {
      expect(mockHeroService.updateHero).toHaveBeenCalled();
    });
  }));
});
