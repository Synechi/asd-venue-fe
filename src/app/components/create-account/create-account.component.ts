import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FormControl, FormGroupDirective, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UserService } from 'src/app/service/user.service';
import { Observable } from 'rxjs';

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

  constructor(private userService: UserService) { }

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
    this.postStatusMessage = help.Status;
  }
  

  onSubmitAccount(form:NgForm) {
    console.log('in onSubmitAccount: ', form);
    // console.log('in onSubmitAccount: ', form.valid);
    // console.log(this.user);

    if (form.valid) {
      this.userService.postUserForm(this.user).subscribe(
        // result => console.log('success: ', result),
        result => this.onHttpStatus(result),
        error => this.onHttpError(error)
      );
    }
    else {
      this.postStatus = true;
      this.postStatusMessage = "Please fix the above errors"
    }

    // if (form.invalid) {
    //   return;
    // }
    // let obs = this.http.post('http://localhost:4000/user', form.value, {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json'
    //   })
    // });
    // obs.subscribe((response) => {
    //   console.log(response);
    //   // var status = JSON.parse(response);

    //   let body = JSON.stringify(response);
    //   let body1 = JSON.parse(body);
    //   this.successMessage = body1.body;
    // });

  }

}
