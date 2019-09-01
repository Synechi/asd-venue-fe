import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingRequestsTableComponent } from './pending-requests-table.component';

describe('PendingRequestsTableComponent', () => {
  let component: PendingRequestsTableComponent;
  let fixture: ComponentFixture<PendingRequestsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingRequestsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingRequestsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
