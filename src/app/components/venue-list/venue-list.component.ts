import { NgModule, NgZone } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material";
import { AddListDialogComponent } from '../add-list-dialog/add-list-dialog.component';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-venue-list',
  templateUrl: './venue-list.component.html',
  styleUrls: ['./venue-list.component.css']
})
export class VenueListComponent implements OnInit {

  constructor(private dialog: MatDialog, private userService: UserService, private __zone: NgZone) { }
  lists: list[] = [];

  openDialog() {

    //allows create list dialog to open
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
    };

    this.dialog.open(AddListDialogComponent, dialogConfig);
  }

  ngOnInit() {
    //gets lists of logged in user
    this.userService.getListsByID("5d628a72d2c6643f8095cefe").subscribe(userlist => {
      for (var key in userlist) {
        if(userlist.hasOwnProperty(key)){
          this.lists.push(userlist[key]);
        }
      }
        console.log(this.lists);
    });
  }

  delete(list) {
    this.userService.deleteListforUser("5d628a72d2c6643f8095cefe", list._id)
    .subscribe(
      data => console.log('list created successfully', data),
      error => console.error('error, cannot save list', error)
    )
  }
}

export interface list {
  _id?: string;
  name: string;
  colour: string;
}
