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

  //backend API http call to retrieve lists of a user by userID
  getListsByID(id) {
    return this.http.get(`${this.listUrl}/lists/${id}`);
  }

  //backend API http call to create a list for a user by userID
  createListforUser(id, list: List) {
    return this.http.patch(`${this.listUrl}/createlist/${id}`, list);
  }

  //backend API http call to delete a list for a user by userID
  deleteListforUser(id, listid) {
    return this.http.delete(`${this.listUrl}/deletelist/${id}/${listid}`);
  }

  //backend API http call to retrieve all venueIDs in a list of a user by userID and listID
  getListVenues(id, listid) {
    return this.http.get(`${this.listUrl}/venues/${id}/${listid}`);
  }

  //backend API http call to delete a venue of a list for a user by userID, listID and venueID
  deleteListVenue(id, listid, placeID) {
    return this.http.delete(
      `${this.listUrl}/deletevenue/${id}/${listid}/${placeID}`
    );
  }

  //backend API http call to add a venueID to a list for a user by userID, listID and venueID
  addListVenue(id, listid, placeID) {
    //makes a placeObj to pass to backend that contains the venueID
    var placeObj = {
      placeID: placeID
    };
    return this.http.patch(
      `${this.listUrl}/addvenue/${id}/${listid}`,
      placeObj
    );
  }
}
