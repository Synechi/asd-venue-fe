import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestedfriendsComponent } from './suggestedfriends.component';

describe('SuggestedfriendsComponent', () => {
  let component: SuggestedfriendsComponent;
  let fixture: ComponentFixture<SuggestedfriendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestedfriendsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestedfriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
