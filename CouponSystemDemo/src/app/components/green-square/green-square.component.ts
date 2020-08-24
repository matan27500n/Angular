import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-green-square',
  templateUrl: './green-square.component.html',
  styleUrls: ['./green-square.component.css']
})
export class GreenSquareComponent implements OnInit {
  color = 'green';
  constructor() { }

  ngOnInit(): void {
  }

}
