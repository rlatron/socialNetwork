import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SubscriptionFormComponent } from './subscription-form/subscription-form.component';
import { LoginFormComponent } from './login-form/login-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SubscriptionFormComponent, LoginFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private router: Router) { }
}
