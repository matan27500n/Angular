import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'CouponDemo';

  public Clicked(element, color): void {
    element.style.color = color;
  }
}
