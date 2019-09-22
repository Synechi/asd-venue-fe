import { NgModule, NgZone } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { AddListDialogComponent } from "../add-list-dialog/add-list-dialog.component";
import { UserService } from "src/app/service/user.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-venue-list",
  templateUrl: "./venue-list.component.html",
  styleUrls: ["./venue-list.component.css"]
})
export class VenueListComponent implements OnInit {

  firstname = this.route.snapshot.paramMap.get("firstname");

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private __zone: NgZone,
    public route: ActivatedRoute
  ) {}
  lists: list[] = [];

  checkFriendID(): boolean {

    return this.route.snapshot.paramMap.get("friendID") == null;
  }

  getFriendID(): any {

    var result;

    if(this.route.snapshot.paramMap.get("friendID") == null) {

      result = "user";
      
    } else result = this.route.snapshot.paramMap.get('friendID');

    return result;
  }


  openDialog() {
    //allows create list dialog to open
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {};

    this.dialog.open(AddListDialogComponent, dialogConfig);
  }

  ngOnInit() {
    // gets lists of logged in user
    let friendID = this.route.snapshot.paramMap.get("friendID");
    
    if(friendID != null) {
      this.userService
      .getListsByID(friendID)
      .subscribe(userlist => {
        for (var key in userlist) {
          if (userlist.hasOwnProperty(key)) {
            this.lists.push(userlist[key]);
          }
        }
      });
    } else {
    this.userService
      .getListsByID(localStorage.getItem("id"))
      .subscribe(userlist => {
        for (var key in userlist) {
          if (userlist.hasOwnProperty(key)) {
            this.lists.push(userlist[key]);
          }
        }
        console.log(this.lists);
      });
    }
  }

  delete(list) {
    this.userService
      .deleteListforUser(localStorage.getItem("id"), list._id)
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
}

export interface list {
  _id?: string;
  name: string;
  colour: string;
}
