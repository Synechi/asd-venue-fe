import { Component, OnInit, Input, Inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { UserService } from "src/app/service/user.service";
import { List } from "src/app/list";

@Component({
  selector: "app-add-list-dialog",
  templateUrl: "./add-list-dialog.component.html",
  styleUrls: ["./add-list-dialog.component.css"]
})
export class AddListDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<AddListDialogComponent>,
    private userService: UserService
  ) {}

  ngOnInit() {}

  //closes dialog
  close() {
    this.dialogRef.close();
  }

  listModel = new List("", "");

  onSubmit() {
    //this.dialogRef.close();
    //window.location.reload();
  }

  createList() {
    this.userService
      .createListforUser(localStorage.getItem("id"), this.listModel)
      .subscribe(data => {
        console.log("list created successfully", data);
      });
    this.dialogRef.close();
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }
}
