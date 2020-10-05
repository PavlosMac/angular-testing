import {TestBed} from '@angular/core/testing';
import {HeroService} from './hero.service';
import {MessageService} from '../message.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';


describe('HeroService', () => {

  let mockMessageService;
  let httpTestingController: HttpTestingController;
  let heroService: HeroService;

  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj(['add']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroService, {provide: MessageService, useValue: mockMessageService}]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    heroService = TestBed.get(HeroService);
  });

  it('should call getHero with the correct url', () => {
    heroService.getHero(6).subscribe();

    const req = httpTestingController.expectOne('api/heroes/6');
    req.flush({id: 6, name: 'John', strength: 111});
    httpTestingController.verify();
  });
});
