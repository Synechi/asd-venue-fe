// chantel
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FormControl, FormGroupDirective, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UserService } from 'src/app/service/user.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

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

  constructor(private userService: UserService, private router: Router) { }

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
    if (help.Status == "Email Address already exists") {
      this.postStatus = true;
      this.postStatusMessage = help.Status;
    }
    else {
      this.postStatus = false;
      localStorage.setItem('id', help.UserID)
      this.router.navigate(['/map'])
    }
  }
  

  onSubmitAccount(form:NgForm) {
    console.log('in onSubmitAccount: ', form);

    if (form.valid) {
      this.userService.postUserForm(this.user).subscribe(
        result => this.onHttpStatus(result),
        error => this.onHttpError(error)
      );

    }
    else {
      this.postStatus = true;
      this.postStatusMessage = "Please fix the above errors"
    }

  }

}
