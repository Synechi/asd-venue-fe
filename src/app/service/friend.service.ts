import { Injectable } from '@angular/core';
import { USERS } from '../mock-users';
import { User} from '../user';
import { BehaviorSubject, of } from 'rxjs';
import { Observable } from 'rxjs'; 
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

users = USERS; 

results = []; 

getAllUsers(): Observable<User[]> { 

  return of(USERS);

}
/* searchUser(name) { 

  let filteredList = this.user.map(function(e) {

    return {ID: e["userID"], Name: e["fName"], Surname: e["lName"]}
  }).filter((e) => e.Name == name);

  return filteredList; 

  } */


constructor(){

}
}
