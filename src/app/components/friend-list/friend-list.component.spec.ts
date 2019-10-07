import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendListComponent } from './friend-list.component';
import { NavComponent } from '../nav/nav.component';
import { CurrentFriendsComponent } from '../current-friends/current-friends.component';
import { AddFriendButtonComponent } from '../add-friend-button/add-friend-button.component';

describe('FriendListComponent', () => {
  let component: FriendListComponent;
  let fixture: ComponentFixture<FriendListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendListComponent, NavComponent, CurrentFriendsComponent, AddFriendButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(FriendListComponent);
    fixture.detectChanges();
    const complied = fixture.debugElement.nativeElement;
    expect(complied.querySelector('h1').textContent).toContain('My Friends');
  }));
});
