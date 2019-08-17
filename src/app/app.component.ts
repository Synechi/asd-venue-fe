import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'asd-venue-fe';

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    // let obs = this.http.post('http://localhost:4000/user', user, {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json'
    //   })
    // });
    // obs.subscribe((response) => console.log(response));
  }
}
