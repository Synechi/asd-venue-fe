import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-request-confirmation',
  templateUrl: './request-confirmation.component.html',
  styleUrls: ['./request-confirmation.component.css']
})
export class RequestConfirmationComponent implements OnInit {

  public isViewable: boolean; 

  alert() :void { 

    this.isViewable = !this.isViewable;
    window.alert("Friend Request has been Sent!");

  }

  hide() :void { 

    this.isViewable = !this.isViewable;
  }
  
  constructor() { }

  ngOnInit() {
  }

}
