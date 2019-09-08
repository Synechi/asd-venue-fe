import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: "root"
})
export class UserService {
  uri = "https://asd-venue-be.herokuapp.com";

  constructor(private http: HttpClient, private router: Router) { }


  // getUser() {
  //   return this.http.get(`${this.uri}/user`);
  // }

  validateUser(user:User) : Observable<any> {
    const param = new HttpParams().set("email", user.email).set("password", user.password)
    return this.http.get('http://localhost:4000/user', {params: param});
  }

  getUserByID(id) {
    return this.http.get(`${this.uri}/user/${id}`);
  }

  postUserForm(user:User) : Observable<any> {
    return this.http.post('http://localhost:4000/user', user);
  }

  loggedIn() {
    return !!localStorage.getItem('id')
  }

  logoutUser() {
    localStorage.removeItem('id')
    this.router.navigate(['/map'])
  }

}
