import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HeroesComponent} from './heroes.component';
import {Directive, HostBinding, HostListener, Input, NO_ERRORS_SCHEMA} from '@angular/core';
import {HeroService} from '../services/hero.service';
import {of} from 'rxjs/internal/observable/of';
import {Hero} from '../hero';
import {HeroComponent} from '../hero/hero.component';
import {By} from '@angular/platform-browser';

@Directive({
  selector: '[routerLink]'
})
export class RouterLinkDirectiveStub {

  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  @HostListener('click') onClick() {
    this.navigatedTo = this.linkParams;
  }
}


describe('HeroesComponent (deep INTEGRATION TEST)', () => {

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
      declarations: [HeroesComponent, HeroComponent, RouterLinkDirectiveStub],
      providers: [{provide: HeroService, useValue: mockHeroService}],
      // schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(HeroesComponent);

  });

  it('should render each Hero as HeroComponent', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    const debugElements = fixture.debugElement.queryAll(By.directive(HeroComponent));

    for (let i = 0; i < debugElements.length; i++) {
      expect(debugElements[i].componentInstance.hero.name).toEqual(HEROES[i].name);
    }
  });

  it(`should call heroService.deleteHero when the heroesComponent delete button is called`, () => {
    // arrange
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    spyOn(fixture.componentInstance, 'delete');

    // act
    fixture.detectChanges();

    const heroComponentsDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));

    // heroComponentsDEs[1].query(By.css('button')).triggerEventHandler('click', {stopPropagation: () => {}});
    heroComponentsDEs[1].triggerEventHandler('delete', null);

    // assert
    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[1]);
  });

  it(`should call heroService.deleteHero when the heroesComponent delete button is called [ANOTHER WAY]`, () => {
    // arrange
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    spyOn(fixture.componentInstance, 'delete');

    // act
    fixture.detectChanges();

    const heroComponentsDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));

    (<HeroComponent>heroComponentsDEs[0].componentInstance).delete.emit(undefined);

    // assert
    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
  });

  it(`should call render new hero when name is input and button clicked`, () => {
    // arrange
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    const name = 'Dave';
    mockHeroService.addHero.and.returnValue(of({id: 3, name: name, strength: 111}));
    // act
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    const button = fixture.debugElement.queryAll(By.css('button'))[0];
    input.value = name;
    button.triggerEventHandler('click', null);

    fixture.detectChanges();
    // assert
    const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;
    console.log(heroText);

    expect(heroText).toContain(name);
  });

  it('should have correct route for first hero', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
    const routerLink = heroComponents[0].query(By.directive(RouterLinkDirectiveStub)).injector.get(RouterLinkDirectiveStub);

    heroComponents[0].query(By.css('a')).triggerEventHandler('click', null);

    expect(routerLink.navigatedTo).toBe('/detail/4');
  });
});

