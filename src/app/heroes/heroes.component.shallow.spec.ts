import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HeroesComponent} from './heroes.component';
import {Component, Input} from '@angular/core';
import {HeroService} from '../services/hero.service';
import {of} from 'rxjs/internal/observable/of';
import {Hero} from '../hero';
import {combineAll} from 'rxjs/operators';

@Component({
  selector: 'app-hero',
  template: '<div></div>',
})
export class FakeHeroComponent {
  @Input() hero: Hero;
  // @Output() delete = new EventEmitter();
}

describe('HeroesComponent (shallow INTEGRATION TEST', () => {

  let fixture: ComponentFixture<HeroesComponent>;
  let HEROES: Hero[];
  let mockHeroService;

  beforeEach(() => {

    HEROES = [
      {id: 4, name: 'Henry', strength: 11},
      {id: 6, name: 'Jack', strength: 41},
      {id: 12, name: 'James', strength: 3}
    ];

    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
    TestBed.configureTestingModule({
      declarations: [HeroesComponent, FakeHeroComponent],
      providers: [{provide: HeroService, useValue: mockHeroService}],
      // schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(HeroesComponent);
  });

  it('should set heroes correctly from service', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    expect(fixture.componentInstance.heroes.length).toBe(3);
  });

  it('should add hero correctly from service', () => {
    mockHeroService.addHero.and.returnValue(of(true));
    fixture.componentInstance.heroes = HEROES;


    fixture.componentInstance.add('Jim');

    expect(fixture.componentInstance.heroes.length).toBe(4);
  });
});

