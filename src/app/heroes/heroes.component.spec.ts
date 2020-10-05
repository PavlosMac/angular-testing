import {HeroesComponent} from './heroes.component';
import {of} from 'rxjs/internal/observable/of';
import {Hero} from '../hero';

// ISOLATED UNIT TESTS
describe('HeroesComponent', () => {

  let HEROES;
  let component: HeroesComponent;

  let mockHeroesService;

  beforeEach(() => {
    HEROES = [
      {id: 4, name: 'Henry', strength: 11},
      {id: 6, name: 'Jack', strength: 41},
      {id: 12, name: 'James', strength: 3}
    ];
    mockHeroesService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
    component = new HeroesComponent(mockHeroesService);
  });

  describe('delete', () => {

    it('should delete hero', () => {
      // arrange
      mockHeroesService.deleteHero.and.returnValue(of(true));
      component.heroes = HEROES;

      // act
      component.delete(HEROES[0]);

      expect(component.heroes.length).toBe(2);
    });

    it('should call delete hero', () => {
      // arrange
      mockHeroesService.deleteHero.and.returnValue(of(true));
      component.heroes = HEROES;

      // act
      component.delete(HEROES[0]);

      expect(component.heroes.length).toBe(2);
    });

    it('should call delete hero in service', () => {
      // arrange
      mockHeroesService.deleteHero.and.returnValue(of(true));
      component.heroes = HEROES;

      // act
      component.delete(HEROES[1]);

      expect(mockHeroesService.deleteHero).toHaveBeenCalled();
      expect(mockHeroesService.deleteHero).toHaveBeenCalledWith(HEROES[1]);
    });

    it('should call add hero in service', () => {
      // arrange
      mockHeroesService.addHero.and.returnValue(of(true));
      component.heroes = HEROES;

      // act
      component.add('Derry');

      expect(mockHeroesService.addHero).toHaveBeenCalled();
      expect(mockHeroesService.addHero).toHaveBeenCalledWith({name: 'Derry', strength: 11});
    });
  });
});
