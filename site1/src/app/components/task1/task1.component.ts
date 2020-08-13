import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task1',
  templateUrl: './task1.component.html',
  styleUrls: ['./task1.component.css']
})
export class Task1Component implements OnInit {
  day1 = 'Tuseday';
  day2 = 'Thurseday';
  startHour = 9;
  endHour1 = 16;
  endHour2 =30;
  constructor() { }

  ngOnInit(): void {
  }

}
