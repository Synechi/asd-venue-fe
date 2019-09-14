import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { List } from "../list";

@Injectable({
  providedIn: "root"
})
export class UserService {
  uri = "https://asd-venue-be.herokuapp.com";
  listUrl = "https://asd-venue-be.herokuapp.com/venuelist";

  constructor(private http: HttpClient) {}

  getUser() {
    return this.http.get(`${this.uri}/user`);
  }

  getUserByID(id) {
    return this.http.get(`${this.uri}/user/${id}`);
  }

  getListsByID(id) {
    return this.http.get(`${this.listUrl}/lists/${id}`);
  }

  createListforUser(id, list: List) {
    return this.http.patch(`${this.listUrl}/createlist/${id}`, list);
  }

  deleteListforUser(id, listid) {
    return this.http.delete(`${this.listUrl}/deletelist/${id}/${listid}`);
  }

  getListVenues(id, listid) {
    return this.http.get(`${this.listUrl}/venues/${id}/${listid}`);
  }

  deleteListVenue(id, listid, placeID) {
    return this.http.delete(
      `${this.listUrl}/deletevenue/${id}/${listid}/${placeID}`
    );
  }

  addListVenue(id, listid, placeID) {
    var placeObj = {
      placeID: placeID
    };
    return this.http.patch(
      `${this.listUrl}/addvenue/${id}/${listid}`,
      placeObj
    );
  }
}
