import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  savetestEmployee(teForm: NgForm): void {
    // if (!teForm.valid) {
    //   return;
    // }
    console.log(teForm.value);
  }
}
