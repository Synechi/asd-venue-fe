import { Component, OnInit, Input, NgZone } from '@angular/core';
import {  Marker } from '../../../Marker';
import { VenueflagService } from '../../venueflag.service';
import { User } from "../../user";
import { UserService } from "../../service/user.service";

@Component({
  selector: '[app-list-list-item]',
  templateUrl: './list-list-item.component.html',
  styleUrls: ['./list-list-item.component.css'],
})


export class ListListItemComponent implements OnInit 
{
  @Input() marker: Marker;

  venueFlag: []; 

  constructor(private venueFlagService : VenueflagService,
    private userService : UserService,
    private __zone: NgZone) {}

  ngOnInit() 
  {
    //Pulls venues from current users venue lists
    this.userService
    .getListsByID(localStorage.getItem("id"))
    .subscribe(result => {
      this.__zone.run(() => {
        // Stringify and then parses the observable object to access the child data.
        var stringObj = JSON.stringify(result);
        var list = JSON.parse(stringObj);
        // Loops over the users venues lists so that the it can access each lists stored venues.
        for (var key in list.venuelists) {
        
        }
  })
})
  
  }

  showRev = false;
  selectedOption: string = ' '; 
  //Event Handler For The Select Element's Change Event
  selectChangeHandler (event : any)
  {
    //Update The UI 
    
    //Updating the selected option 
    this.selectedOption = event.target.value;

    //Checking whether the option is 'Visited' to show the Review Button 
    if (this.selectedOption == 'Visited') {
      this.showRev = true;
    } else {
      this.showRev = false;
    }

    //Storing the venue name and the venue flag into the database 
    this.venueFlagService.addVenueFlag(this.marker.name, this.selectedOption, localStorage.getItem("id")).subscribe(venueFlag => {console.log(venueFlag);})
  
    
  }  

}
