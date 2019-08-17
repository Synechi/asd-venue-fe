import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
  response: any;
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


  registerUser(user){
    console.log(user);
    let obs = this.http.post('http://localhost:4000/user', user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
    obs.subscribe((response) => console.log(response));

  //   let obs = this.http.post('http://localhost:4000/user', user, {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     })
  // })
  }

}
