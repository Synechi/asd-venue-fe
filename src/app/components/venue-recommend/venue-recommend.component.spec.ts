import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueRecommendComponent } from './venue-recommend.component';

describe('VenueRecommendComponent', () => {
  let component: VenueRecommendComponent;
  let fixture: ComponentFixture<VenueRecommendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenueRecommendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueRecommendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
