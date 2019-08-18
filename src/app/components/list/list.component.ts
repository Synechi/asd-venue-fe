import { Component, OnInit } from '@angular/core';

export interface VenueU {
  name: string;
  location: string;
}

const venue_data: VenueU[] = [
  {name: 'Hydrogen', location: 'H'},
  {name: 'Helium', location: 'He'},
];

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor() { }

  ngOnInit() {

}
}
export class TableBasicExample {
  displayedColumns: string[] = ['name'];
  dataSource = venue_data;
}
