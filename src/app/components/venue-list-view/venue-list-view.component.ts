import { Component, OnInit, NgZone } from "@angular/core";
import { UserService } from "src/app/service/user.service";
import { ActivatedRoute } from "@angular/router";
import { GoogleMapsService } from "../../service/google-maps.service";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { AddVenueDialogComponent } from "../add-venue-dialog/add-venue-dialog.component";

@Component({
  selector: "app-venue-list-view",
  templateUrl: "./venue-list-view.component.html",
  styleUrls: ["./venue-list-view.component.css"]
})
export class VenueListViewComponent implements OnInit {
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private gMapsService: GoogleMapsService,
    private __zone: NgZone,
    private dialog: MatDialog
  ) {}

  openDialog() {
    //allows create list dialog to open
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = { listID: this.route.snapshot.paramMap.get("id") };

    this.dialog.open(AddVenueDialogComponent, dialogConfig);
  }

  delete(venue) {
    this.userService
      .deleteListVenue(
        "5d628a72d2c6643f8095cefe",
        this.route.snapshot.paramMap.get("id"),
        venue.place_id
      )
      .subscribe(
        data => console.log("list created successfully", data),
        error => console.error("error, cannot save list", error)
      );
    window.location.reload();
  }

  venues: venue[] = [];
  listName: string;

  ngOnInit() {
    this.userService
      .getListVenues(
        "5d628a72d2c6643f8095cefe",
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
}

export interface venue {
  name: String;
  formatted_phone_number: String;
  place_id: String;
  formatted_address: String;
}
