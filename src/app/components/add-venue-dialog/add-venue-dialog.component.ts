import { Component, OnInit, Inject } from "@angular/core";
import { UserService } from "src/app/service/user.service";
import { ActivatedRoute } from "@angular/router";
import { MatDialogRef } from "@angular/material";
import { GoogleMapsService } from "src/app/service/google-maps.service";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-add-venue-dialog",
  templateUrl: "./add-venue-dialog.component.html",
  styleUrls: ["./add-venue-dialog.component.css"]
})
export class AddVenueDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<AddVenueDialogComponent>,
    private route: ActivatedRoute,
    private userService: UserService,
    private gMapService: GoogleMapsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  name: string;

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  onSubmit() {
    // this.dialogRef.close();
    // window.location.reload();
  }

  createList() {

    this.gMapService
      .getDetails(this.data.placeID, document.createElement("div"))
      .subscribe(venueDetails => {
        console.log("made it this far");
        if (Object.keys(venueDetails).length === 0) {
          console.log("Invalid Place ID");
        } else {


          this.userService
            .addListVenue(
              localStorage.getItem("id"),
              this.data.listID,
              this.data.placeID
            )
            .subscribe(
              data => {
                console.log("Venue Added", data);
              },
              error => console.error("error, cannot save venue to list", error)
            );
        }
      });
    this.dialogRef.close();
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }
}
