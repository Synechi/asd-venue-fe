import { Component, OnInit, NgZone, ViewChild, Input, Output, EventEmitter } from "@angular/core";
import { UserService } from "src/app/service/user.service";
import { ActivatedRoute } from "@angular/router";
import { GoogleMapsService } from "../../service/google-maps.service";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { AddVenueDialogComponent } from "../add-venue-dialog/add-venue-dialog.component";

declare var google: any;


@Component({
  selector: "app-venue-list-view",
  templateUrl: "./venue-list-view.component.html",
  styleUrls: ["./venue-list-view.component.css"]
})
export class VenueListViewComponent implements OnInit {
  @Input() adressType: string;
  @Output() setAddress: EventEmitter<any> = new EventEmitter();
  @ViewChild('listsearchbar', { static: true }) listsearchbar: any;
  constructor(
    private userService: UserService,
    public route: ActivatedRoute,
    private gMapsService: GoogleMapsService,
    private __zone: NgZone,
    private dialog: MatDialog
  ) { }



  openDialog(result) {
    //allows create list dialog to open
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      listID: this.route.snapshot.paramMap.get("id"),
      name: result.name,
      placeID: result.place_id
    };
    console.log(dialogConfig.data);

    this.dialog.open(AddVenueDialogComponent, dialogConfig);
  }

  delete(venue) {
    this.userService
      .deleteListVenue(
        localStorage.getItem("id"),
        this.route.snapshot.paramMap.get("id"),
        venue.place_id
      )
      .subscribe(
        data => {
          console.log("list created successfully", data);
        },
        error => console.error("error, cannot save list", error)
      );
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  venues: venue[] = [];
  listName: string;

  // If it is a friend, the display will change to display the friend's venue list
  ngOnInit() {
    let friendID = this.route.snapshot.paramMap.get("friendID");

    if (friendID != "user") {
      this.userService
        .getListVenues(friendID, this.route.snapshot.paramMap.get("id"))
        .subscribe(venueList => {
          var storage = JSON.stringify(venueList);
          var details = JSON.parse(storage);
          this.listName = details.venuelists[0].name;
          for (var ven in details.venuelists[0].venues) {
            this.gMapsService
              .getDetails(
                details.venuelists[0].venues[ven].placeID,
                document.createElement("div")
              )
              .subscribe(venuedetails => {
                this.__zone.run(() => {
                  this.venues.push(venuedetails);
                });
              });
          }
        });
    } else {
      this.userService
        .getListVenues(
          localStorage.getItem("id"),
          this.route.snapshot.paramMap.get("id")
        )
        .subscribe(venueList => {
          var storage = JSON.stringify(venueList);
          var details = JSON.parse(storage);
          this.listName = details.venuelists[0].name;
          for (var ven in details.venuelists[0].venues) {
            this.gMapsService
              .getDetails(
                details.venuelists[0].venues[ven].placeID,
                document.createElement("div")
              )
              .subscribe(venuedetails => {
                this.__zone.run(() => {
                  this.venues.push(venuedetails);
                });
              });
          }
        });
    }
    console.log(this.venues);
  }

  loadList() {
    this.getPlaceAutocomplete();
  }


  private getPlaceAutocomplete() {
    var ne = new google.maps.LatLng(-33.853487, 151.218456);
    var sw = new google.maps.LatLng(-33.884559, 151.194724);
    var bound = new google.maps.LatLngBounds(sw, ne);
    const autocomplete = new google.maps.places.Autocomplete(this.listsearchbar.nativeElement, {
      componentRestrictions: { country: 'au' },
      types: ['establishment'],
      bounds: bound
    })
    google.maps.event.addListener(autocomplete, "place_changed", () => {
      if (this.route.snapshot.paramMap.get('friendID') == 'user') {
        const place = autocomplete.getPlace();
        this.openDialog(place)
      }

    })
  }
}

export interface venue {
  name: String;
  formatted_phone_number: String;
  place_id: String;
  formatted_address: String;
  website: String;
  opening_hours: String;
}
