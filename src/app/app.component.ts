import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { LoginComponent } from './components/login/login.component';

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
  }
}
