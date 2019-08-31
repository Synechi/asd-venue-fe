import { Component, OnInit, NgModule, NgZone } from "@angular/core";
import { GoogleMapsService } from "../../service/google-maps.service";

declare var google: any;


@Component({
  selector: 'app-list-list',
  templateUrl: './list-list.component.html',
  styleUrls: ['./list-list.component.css']
})
export class ListListComponent implements OnInit {
  venues = [
    new Venue("ChIJDTR29iauEmsR97nGzWimbMo", "" , "", ""),
    new Venue("ChIJISFoEiKuEmsR8TMqpG8xgwQ", "", "", ""),
    new Venue("ChIJC78QMReuEmsR47yBEa6iDPQ", "", "", ""),
    new Venue("ChIJ65p_3jyuEmsRuwkbKixObtM", "", "", ""),
  ];
  constructor(
    private gMapsService: GoogleMapsService,
    private __zone: NgZone
  ) { }

  ngOnInit() {
    }
    showRev = false;
    selectedOption: string = ' '; 
    //Event Handler For The Select Element's Change Event
    selectChangeHandler (event : any, index: number)
    {
      //Update The UI 
      this.selectedOption = event.target.value;
  
      if (this.selectedOption == 'Visited') {
        this.showRev = true;
      } else {
        this.showRev = false;
      }
    }
    selectChange1Handler (event : any, index: number)
    {
      //Update The UI 
      this.selectedOption = event.target.value; 
    }

  getDetail(placeID: string, map: any) 
  {
    this.gMapsService.getDetails(placeID, map).subscribe(result => {
      this.__zone.run(() => {
        console.log(result);
      });
    });
  }

}

export class Venue {
  constructor(
      public id: string,
      public name: string,
      public address: string,
      public genre: string
      ) { }
  }
