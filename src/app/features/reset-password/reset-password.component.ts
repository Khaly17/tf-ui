import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  password = '';
  confirmPassword = '';
  token = '';
  loading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {
    this.token = this.route.snapshot.paramMap.get('token') || '';
  }

  resetPassword() {
    this.errorMessage = '';
    this.successMessage = '';
    if (this.password !== this.confirmPassword) {
      this.errorMessage = "Les mots de passe ne correspondent pas.";
      return;
    }

    this.loading = true;

    this.http.post(`${environment.BASE_URL}/auth/reset-password`, {
      token: this.token,
      password: this.password
    }).subscribe({
      next: () => {
        this.successMessage = "Mot de passe réinitialisé avec succès. Vous pouvez maintenant vous connecter.";
        this.loading = false;
        setTimeout(() => this.router.navigate(['/login']), 3000);
      },
      error: err => {
        this.errorMessage = err.error?.error || "Erreur lors de la réinitialisation.";
        this.loading = false;
      }
    });
  }
}
