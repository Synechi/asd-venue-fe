import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { FormControl, FormGroupDirective, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})

export class NewAccountComponent implements OnInit {

  firstname: string = "";
  lastname: string = "";
  email: string = "";
  password: string = "";
  conpassword: string = "";
  preference: string = "";
  response: any;
  successMessage: string ="";

  constructor(private http: HttpClient) { 
    
  }

  ngOnInit() {
  }

 






  registerUser(form: NgForm){
    console.log(form.value);
    if (form.invalid) {
      return;
    }
    let obs = this.http.post('http://localhost:4000/user', form.value, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
    obs.subscribe((response) => {
      // console.log(response);
      let body = JSON.stringify(response);
      let body1 = JSON.parse(body);
      this.successMessage = body1.body;
    });

  }

}
