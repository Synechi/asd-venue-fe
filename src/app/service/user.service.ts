import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { List } from '../list';

@Injectable({
  providedIn: "root"
})
export class UserService {
  uri = "http://localhost:4000";

  constructor(private http: HttpClient) {}

  getUser() {
    return this.http.get(`${this.uri}/user`);
  }

  getUserByID(id) {
    return this.http.get(`${this.uri}/user/${id}`);
  }
  
  getListsByID(id) {
    return this.http.get(`${this.uri}/lists/${id}`);
  }

  createListforUser(id, list: List) {
    return this.http.patch(`${this.uri}/createlist/${id}`, list);
  }

  deleteListforUser(id, listid) {
    return this.http.delete(`${this.uri}/deletelist/${id}/${listid}`);
  }
}

