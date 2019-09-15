import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';




import { BehaviorSubject, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: "root"
})
export class UserService {
  uri = "https://asd-venue-be.herokuapp.com";

  constructor(private http: HttpClient, private router: Router) { }


  // getUser() {
  //   return this.http.get(`${this.uri}/user`);
  // }

  //Chantel
  validateUser(user:User) : Observable<any> {
    const param = new HttpParams().set("email", user.email).set("password", user.password)
    // return this.http.get('http://localhost:4000/user', {params: param});
    return this.http.get(`${this.uri}/user`, {params: param});
  }

  getUserByID(id) {
    return this.http.get(`${this.uri}/user/${id}`);
  }

  //Chantel
  postUserForm(user:User) : Observable<any> {
    // return this.http.post('http://localhost:4000/user', user);
    return this.http.post(`${this.uri}/user`, user);
  }

  //Chantel
  loggedIn() {
    return !!localStorage.getItem('id')
  }

  //Chantel
  logoutUser() {
    localStorage.removeItem('id')
    this.router.navigate(['/map'])
  }

}
