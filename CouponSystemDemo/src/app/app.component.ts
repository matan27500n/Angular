import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'site1';
  name = 'Matan';
  age = 22;
  age2 = 27;
  result = null;
  date = new Date();

  public doSomething(): void{
    this.name = 'Yossi';
  }
  public whoIsBigger(): void{
    if(this.age > this.age2){
      this.result = 'age is bigger';
    } else{
      this.result = 'age2 is bigger';
    }
  }
 
  
}
