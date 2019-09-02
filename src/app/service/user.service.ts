import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: "root"
})
export class UserService {
  uri = "https://asd-venue-be.herokuapp.com";

  constructor(private http: HttpClient) { }


  getUser() {
    return this.http.get(`${this.uri}/user`);
  }

  getUserByID(id) {
    return this.http.get(`${this.uri}/user/${id}`);
  }

  postUserForm(user:User) : Observable<any> {
    return this.http.post('http://localhost:4000/user', user);
  }
}
