import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListListItemComponent } from './list-list-item.component';

describe('ListListItemComponent', () => {
  let component: ListListItemComponent;
  let fixture: ComponentFixture<ListListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
