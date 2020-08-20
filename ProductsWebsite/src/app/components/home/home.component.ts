import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public currentDiscount: number;
  public currentDate: Date;
  public imageWidth: number;
  public isWinter: boolean;
  public fruits = ["Bananas","Peaches","Watermelons","Ananas", "Oranges"];

  public constructor(private title: Title) { }

  public ngOnInit(): void {
    this.title.setTitle("Home products!");
    this.currentDiscount = 10;
    this.currentDate = new Date();
    this.imageWidth = 300;
    const month = this.currentDate.getMonth() + 1;
    this.isWinter = month >= 11 || month <= 3;
  }

  public alertImageSize(): void{
    alert("The image width: " + this.imageWidth)
  }

  public increaseWidth(): void{
    this.imageWidth += 10;
  }

  public decreaseWidth(): void{
    this.imageWidth -= 10;
  }

  public resetWidth(): void{
    this.imageWidth =300;
  }

}
