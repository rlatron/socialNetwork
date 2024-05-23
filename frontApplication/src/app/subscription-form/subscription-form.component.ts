import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../model/user';
import { AuthenticationService } from '../services/authenticationService';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-subscription-form',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './subscription-form.component.html',
  styleUrl: './subscription-form.component.css'
})
export class SubscriptionFormComponent {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router) {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    }); 
    }

  register() {
    console.log('Subscription form submitted!');

    const username = this.registerForm.value.username;
    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;
    const user = new User(username, password, email);
    this.authenticationService.logon(user)
      .subscribe({
        next: next => {
          console.log('POST request successful:', next);
          this.router.navigate(['/home']);
        },
        error: error =>  {
          console.error('Error making POST request:', error);
          const errorElement = document.getElementById("error-message");
          if (error instanceof HttpErrorResponse) {
            switch (error.status) {
              case 409:
                errorElement.textContent = "There is already an account associated to this email";
                break;
              case 500: 
                errorElement.textContent = "An internal error occured with the server";
                break;
              default: 
                errorElement.textContent = "An error occured while sending the request to the server";
                break;
            }
          }
          else {
            errorElement.textContent = "An error occured";
          }
        }
      })
  } 
}
