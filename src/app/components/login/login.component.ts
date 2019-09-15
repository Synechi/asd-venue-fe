// chantel
import { Component, OnInit } from "@angular/core";
import { UserService } from "../../service/user.service";
import { User } from 'src/app/models/user.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {

  successMessage: string ="";
  postStatus = false;
  postStatusMessage ='';

  user: User = {
    id: null,
    firstname: null,
    lastname: null,
    email: null, 
    password: null, 
    conpassword: null, 
    preference: null
  }

  
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    
  }

  onHttpError(errorResponse: any) {
    console.log('error: ', errorResponse);
    this.postStatus = true;
    this.postStatusMessage = "Internal Error";
  }

  onHttpStatus(statusResponse: any) {
    console.log('status: ', statusResponse);
    this.postStatus = true;
    var help = JSON.parse(JSON.stringify(statusResponse))
    if (help.UserID == null) {
      this.postStatus = true;
      this.postStatusMessage = help.Status;
    }
    else {
      this.postStatus = false;
      localStorage.setItem('id', help.UserID)
      this.router.navigate(['/map'])
    }
    // this.postStatusMessage = help.Status;
  }


  onSubmitLogin (form:NgForm) {
    this.userService.validateUser(this.user).subscribe(
    result => this.onHttpStatus(result),
    error => this.onHttpError(error)
    );

  }
}
