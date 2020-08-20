import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  public constructor(private title: Title){
    
  }
  public ngOnInit(): void {
   this.title.setTitle("About site");
  }


    public showImage(imageSource: string): void{
      alert("User clicked on image named: " + imageSource);
    }
}
