// import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
// import { ActivatedRouteStub } from './ActivatedRouteStub';
// import { VenueListComponent } from './venue-list.component';

// import { convertToParamMap, ActivatedRoute } from '@angular/router';
// import { Observable, of } from 'rxjs';


// describe('VenueListComponent', () => {
//   let component: VenueListComponent;
//   let fixture: ComponentFixture<VenueListComponent>;
 


//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ VenueListComponent ],
//       providers: {provide: ActivatedRoute, useClass: ActivatedRouteStub} 
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(VenueListComponent);
//     component = fixture.componentInstance;
//     const activatedRoute = fixture.debugElement.injector.get(ActivatedRoute) as any; 
//     activatedRoute.testParamMap = { friendID: '123'}; 
//     fixture.detectChanges();
//   });

//   it("should route to friend's lists", () => { 

//         expect(component.getFriendID().toEqual('123'));

//   }); 
  

//   // it('should create', () => {
//   //   expect(component).toBeTruthy();
//   // });

// });
