import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class UserService {
  uri = "https://asd-venue-be.herokuapp.com";

  constructor(private http: HttpClient) {}

  getUser() {
    return this.http.get(`${this.uri}/user`);
  }

  getUserByID(id) {
    return this.http.get(`${this.uri}/user/${id}`);
  }
}
