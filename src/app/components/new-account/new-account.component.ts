import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user.model';
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

  user: User = {
    id: null,
    firstname: null,
    lastname: null,
    email: null, 
    password: null, 
    conpassword: null, 
    preference: null
  }

  constructor(private http: HttpClient) { 
    
  }

  ngOnInit() {
  }

  // submit() {
  //   this.http.get('https://api.github.com/users/' + this.firstname + this.lastname + this.email + this.password + this.conpassword)
  //   .subscribe((response) => {
  //     this.response = response;
  //     console.log(this.response);
  //   })
  // }

  // let obs = this.http.post('http://localhost:4000/user', user, {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     })

    // let obs = this.http.post('http://localhost:4000/user', user, {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json'
    //   })
    // });
    // obs.subscribe((response) => console.log(response));

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
        console.log(response);
        // var status = JSON.parse(response);

        let body = JSON.stringify(response);
        let body1 = JSON.parse(body);
        this.successMessage = body1.body;
      });
  
    }




  // registerUser(user){
  //   console.log(user);
  //   let obs = this.http.post('http://localhost:4000/user', user, {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     })
  //   });
  //   obs.subscribe((response) => console.log(response));

  // //   let obs = this.http.post('http://localhost:4000/user', user, {
  // //     headers: new HttpHeaders({
  // //       'Content-Type': 'application/json'
  // //     })
  // // })
  // }

}
