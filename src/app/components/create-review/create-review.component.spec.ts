import {
    async,
    ComponentFixture,
    TestBed,
    inject,
    fakeAsync
  } from "@angular/core/testing";
  import { CreateReviewComponent } from "./create-review.component";
  import { Component } from '@angular/core';
  import { DebugElement } from "@angular/core";
  import { LayoutModule } from "@angular/cdk/layout";
  import { RouterModule } from "@angular/router";
  import { MatButtonModule } from "@angular/material/button";
  import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
  import { HttpClientTestingModule } from "@angular/common/http/testing";
  import { RouterTestingModule } from "@angular/router/testing";
  import { ReviewsService } from "src/app/service/reviews.service";
  import { User } from "src/app/user";
  import { of } from "rxjs";
import { NavComponent } from '../nav/nav.component';
import { FormsModule }   from '@angular/forms';
import { By } from '@angular/platform-browser';
import { browser, element, by } from 'protractor';

  describe("Create review", () => {
    let fixture: ComponentFixture<CreateReviewComponent>;
    let component: CreateReviewComponent;
    // let de: DebugElement;
    let submitButton: DebugElement;
    let reviewDescription: DebugElement;

  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [CreateReviewComponent, NavComponent],
        imports: [
            RouterModule,
            HttpClientTestingModule,
            FormsModule,
            MatButtonModule,
            MatIconModule,
            MatListModule,
            MatSidenavModule,
            MatToolbarModule,
            RouterTestingModule.withRoutes([])
        ],
        providers: [{ provide: ReviewsService}]
      }).compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(CreateReviewComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      submitButton = fixture.debugElement.query(By.css('#submitReview'));
      reviewDescription = fixture.debugElement.query(By.css('#reviewDescription'));
    //   submitButton = fixture.debugElement.query(By.css('input[id=submitReview]'));
    //   reviewDescription = fixture.debugElement.query(By.css('input[id=reviewDescription]'));
    });
  
    it("should create Create Review component", () => {
        expect(component).toBeTruthy();
    });

    it("should call onSubmitReview function", async(() => {
      spyOn(component, "onSubmitReview");
  
      let button = fixture.debugElement.nativeElement.querySelector('button');
      button.click();
  
      fixture.whenStable().then(() => {
        expect(component.onSubmitReview).toHaveBeenCalled();
      });
    }));

    it('Entering review values in input control and emit output evnts', ()=> {
        let review: any;
        reviewDescription.nativeElement.value = "This place was excellent";
        submitButton.triggerEventHandler('click', null);
    });

    it ('should show venue name as KFC', async(()=> {
        component.review.venueName = 'KFC';
        fixture.detectChanges();
        fixture.whenStable().then(() => { 
            expect(fixture.nativeElement.querySelector('h4').textContent).toContain('KFC');
        });

    }));

    it ('create review successful', function(){
        browser.get('http://localhost:9876/create-review');
        // element(by.review('reviewDescription').sendKeys('It was good'));
        // element(by.id('submitReview')).click()
        // browser.wait(function() {
        //     return browser.getCurrentUrl().then(function(url) {
        //        return url === 'http://localhost:9876/map';
        //     });
        //  });

    });

  });
  