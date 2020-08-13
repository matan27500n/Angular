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
  date = new Date();

  public doSomething(): void{
    this.name = 'Yossi';
  }
}
