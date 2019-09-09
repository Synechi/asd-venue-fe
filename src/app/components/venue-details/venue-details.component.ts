import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-venue-details',
  templateUrl: './venue-details.component.html',
  styleUrls: ['./venue-details.component.css']
})
export class VenueDetailsComponent implements OnInit {
  showRev = false;
  selectedOption: string = ' '; 
  //Event Handler For The Select Element's Change Event
  selectChangeHandler (event : any)
  {
    //Update The UI 
    this.selectedOption = event.target.value;

    if (this.selectedOption == 'Visited') {
      this.showRev = true;
    } else {
      this.showRev = false;
    }
  }

  selectedOption1: string = ' '; 
  //Event Handler For The Select Element's Change Event
  selectChange1Handler (event : any)
  {
    //Update The UI 
    this.selectedOption1 = event.target.value; 
  }

  selectedOption2: string = ' '; 
  //Event Handler For The Select Element's Change Event
  selectChange2Handler (event : any)
  {
    //Update The UI 
    this.selectedOption2 = event.target.value; 
  }

  selectedOption3: string = ' '; 
  //Event Handler For The Select Element's Change Event
  selectChange3Handler (event : any)
  {
    //Update The UI 
    this.selectedOption3 = event.target.value; 
  }

  selectedOption4: string = ' '; 
  //Event Handler For The Select Element's Change Event
  selectChange4Handler (event : any)
  {
    //Update The UI 
    this.selectedOption4 = event.target.value; 
  }

  selectedOption5: string = ' '; 
  //Event Handler For The Select Element's Change Event
  selectChange5Handler (event : any)
  {
    //Update The UI 
    this.selectedOption5 = event.target.value; 
  }

  selectedOption6: string = ' '; 
  //Event Handler For The Select Element's Change Event
  selectChange6Handler (event : any)
  {
    //Update The UI 
    this.selectedOption6 = event.target.value; 
  }

  selectedOption7: string = ' '; 
  //Event Handler For The Select Element's Change Event
  selectChange7Handler (event : any)
  {
    //Update The UI 
    this.selectedOption7 = event.target.value; 
  }

  selectedOption8: string = ' '; 
  //Event Handler For The Select Element's Change Event
  selectChange8Handler (event : any)
  {
    //Update The UI 
    this.selectedOption8 = event.target.value; 
  }

  selectedOption9: string = ' '; 
  //Event Handler For The Select Element's Change Event
  selectChange9Handler (event : any)
  {
    //Update The UI 
    this.selectedOption9 = event.target.value; 
  }
  
  constructor() { }

  ngOnInit() {
  }

}
