import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsNavComponent } from './friends-nav.component';

describe('FriendsNavComponent', () => {
  let component: FriendsNavComponent;
  let fixture: ComponentFixture<FriendsNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendsNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
