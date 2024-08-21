import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  //templateUrl: './app.component.html',
  //styleUrl: './app.component.css'
  //test
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {
  title = 'angular-login';
}
