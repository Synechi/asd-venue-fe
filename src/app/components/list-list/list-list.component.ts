import { Component, OnInit, NgModule, NgZone, Input } from "@angular/core";
import { GoogleMapsService } from "../../service/google-maps.service";
import { MarkerManager } from "@agm/core";
import { UserService } from "../../service/user.service";

declare var google: any;

@Component({
  selector: "app-list-list",
  templateUrl: "./list-list.component.html",
  styleUrls: ["./list-list.component.css"]
})
export class ListListComponent implements OnInit {
  //Generates The Filtered Venues Array
  filteredVenues: any[];
  //Generates The Message Variable & Declres It As A String
  message: string = "";
  constructor(
    private gMapsService: GoogleMapsService,
    private userService: UserService,
    private __zone: NgZone
  ) { }

  ngOnInit() { }
  //Called After The Constructor To Declare/Initialise The Markers Array
  markers: marker[] = [];

  // Map Center
  latitude = -33.870752;
  longitude = 151.208221;
  // Marker Loader
  loadMarkers($event) {
    this.getPlaces($event);
  }

  showRev = false;
  selectedOption: string = " ";
  //Event Handler For The Select Element's Change Event
  selectChangeHandler(event: any) {
    //Updates The UI To Display The Visited Button If The Selected Option Is Visited & To Not Display Anything If The Option Is "Want To Visit" Or Blank
    this.selectedOption = event.target.value;

    if (this.selectedOption == "Visited") {
      this.showRev = true;
    } else {
      this.showRev = false;
    }
  }

  getPlaces(map: any) {
    //Used to generate test data
    this.gMapsService.getBarRest(map).subscribe(result => {
      this.__zone.run(() => {
        for (var place of result) {
          // this.markers.push({
          //   lat: place.geometry.location.lat(),
          //   lng: place.geometry.location.lng(),
          //   name: place.name,
          //   address: place.vicinity,
          //   label: labelType,
          //   icon: {
          //     url: place.icon,
          //     scaledSize: {
          //       height: 20,
          //       width: 20
          //     }
          //   },
          //   rating: place.rating,
          //   open: openHour,
          //   placeID: place.placeID
          // });
          error => console.log(error);
        }
      });
    });
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
            // Loops over the lists venues to generate each marker on the map.
            for (var test in list.venuelists[key].venues) {
              // Search the google maps Place API with the Place ID and returns an obserable object with the details of that place.
              this.gMapsService
                .getDetails(list.venuelists[key].venues[test].placeID, map)
                .subscribe(details => {
                  this.__zone.run(() => {
                    //Generates The Lable Variable
                    var label;
                    //Generates The "Restaurant", "Bar" & "Other" Labels & Matches The Particular Icon Image To The Restuarant Or Bar Label.
                    if (details.icon === "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png") {
                      label = "Restaurant"
                    } else if (details.icon === "https://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png") {
                      label = "Bar"
                    } else {
                      label = "Other";
                    }

                    //Declares These Variables To Be Stored In The Markers Array
                    this.markers.push({
                      name: details.name,
                      address: details.formatted_address,
                      list: list.venuelists[key].name,
                      label: label,
                    });
                  });
                });
            }
          }
          this.filteredVenues = this.markers;
        });
      });
  }

  //filter(query : string)
  //{
  //this.filteredVenues = (query) ?
  //this.markers.filter(v => v.label.toLowerCase().includes(query.toLowerCase())) : 
  //this.markers; 
  //if(query != "Bar" && query != "Restaurant")
  //{
  //this.message = "Venue Genre Required. Search 'Restaurant' Or 'Bar'."
  //}
  //}

  //Method For Filtering The User's Query
  filter(query: string) {
    if (query != "Bar" && query != "Restaurant") {
      console.log(query)
      this.message = "Venue Genre Required. Search 'Restaurant' Or 'Bar'."
    }
    else {
      this.message = ""
      this.filteredVenues = (query) ?
        this.markers.filter(v =>
          v.label.toLowerCase().includes(query.toLowerCase())) :
        this.markers;
    }
  }

  arraysort_name() {
    this.markers.sort((a, b) => (a.name > b.name ? 1 : -1));
  }
  arraysort_location() {
    this.markers.sort((a, b) => (a.address > b.address ? 1 : -1));
  }
  arraysort_genre() {
    this.markers.sort((a, b) => (a.label > b.label ? 1 : -1));
  }
}


export class marker {
  name: string;
  list: string;
  address: string;
  label: string;
}