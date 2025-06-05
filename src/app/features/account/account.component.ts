import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {
  registerForm: FormGroup;
  isLoading = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private fb: FormBuilder,  private router: Router, private userService:UserService) {
    this.registerForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    });
  }

  onRegister() {
    this.errorMessage = null;
    this.successMessage = null;

    if (this.registerForm.invalid) return;

    const form = this.registerForm.value;

    if (form.password !== form.confirm_password) {
      this.errorMessage = 'Les mots de passe ne correspondent pas.';
      return;
    }

     
    
    let processedIdentifier = form.phone;
    const isPhone = /^\d{7,15}$/.test(form.phone);  

    if (isPhone && !form.phone.startsWith('+')) {
      processedIdentifier = '+221' + form.phone;
    }
    const payload = {
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email,
      phone: processedIdentifier,
      password: form.password
    };

    this.isLoading = true;
    this.userService.register(payload).subscribe({
      next: (res) => {
        this.successMessage = res.message || 'Inscription réussie !';
        this.registerForm.reset();
        setTimeout(() => this.router.navigate(['/login']), 2500);
      },
      error: (err) => {
        this.errorMessage = err.error?.error || "Une erreur s'est produite.";
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
