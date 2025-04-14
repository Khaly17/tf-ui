import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  email = '';
  successMessage = '';
  errorMessage = '';
  loading = false;

  constructor(private http: HttpClient) {}

  sendResetLink() {
    this.successMessage = '';
    this.errorMessage = '';
    this.loading = true;

    this.http.post(`${environment.BASE_URL}/auth/forgot-password`, { email: this.email }).subscribe({
      next: () => {
        this.successMessage = "Un lien de réinitialisation a été envoyé à votre adresse email.";
        this.loading = false;
      },
      error: err => {
        this.errorMessage = err.error?.error || "Erreur lors de l’envoi du lien.";
        this.loading = false;
      }
    });
  }
}
