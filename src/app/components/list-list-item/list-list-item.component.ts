import { Component, OnInit, Input } from '@angular/core';
import {  Marker } from '../../../Marker';
import { VenueflagService } from '../../venueflag.service';
import { User } from "../../user";

@Component({
  selector: '[app-list-list-item]',
  templateUrl: './list-list-item.component.html',
  styleUrls: ['./list-list-item.component.css']
})
export class ListListItemComponent implements OnInit 
{
  @Input() marker: Marker;

  constructor(private venueFlagService : VenueflagService) {}

  ngOnInit() 
  {
  }

  showRev = false;
  selectedOption: string = ' '; 
  //Event Handler For The Select Element's Change Event
  selectChangeHandler (event : any)
  {
    //Update The UI 
    this.selectedOption = event.target.value;
    if (this.selectedOption == 'Visited') {
      this.showRev = true;
    } else {
      this.showRev = false;
    }

    this.venueFlagService.addVenueFlag(this.marker.name, this.selectedOption, localStorage.getItem("id")).subscribe(venueFlag => {console.log(venueFlag);})
  }  

}
