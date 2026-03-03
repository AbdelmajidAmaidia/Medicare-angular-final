import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NavigationService, UserRole } from '../../services/navigation.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  activeTab: 'login' | 'register' = 'login';
  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private navService: NavigationService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      role: ['patient', Validators.required],
    });
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      role: ['patient', Validators.required],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const role = this.loginForm.value.role as UserRole;
      this.navService.setRole(role);
      this.authService.login();
    }
  }

  onRegister() {
    if (this.registerForm.valid) {
      const role = this.registerForm.value.role as UserRole;
      this.navService.setRole(role);
      this.authService.login();
    }
  }
}
