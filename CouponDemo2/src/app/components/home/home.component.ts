import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public selected: string;
  constructor() {}

  panelOpenState = false;
  typeOfContacts: string[] = [
    'Phone: 050-2799773',
    'Email: matan27500n@gmail.com',
    'GitHub: matan27500n',
    'LinkedIn: matan27500n',
  ];

  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];

  ngOnInit(): void {}
}
