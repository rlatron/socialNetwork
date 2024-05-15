import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authenticationService';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      this.authenticationService.login(email, password)
        .subscribe({
          next: next => {
            console.log('POST request successful:', next);
            this.router.navigate(['/home']);
          },
          error: error => {
            console.error('Error making POST request:', error);
            const errorElement = document.getElementById("error-message");
            if (error instanceof HttpErrorResponse && (error.status === 401 || error.status === 404)) {
              errorElement.textContent = "Wrong password or inexistant email";
            }
            else {
              errorElement.textContent = "An error occured";
            }
          }
        });
    }
  }
}
