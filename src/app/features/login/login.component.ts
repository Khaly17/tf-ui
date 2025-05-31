import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { CommonModule } from '@angular/common';
import { TokenService } from '../../core/auth/token.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  router = inject(Router)
  authService = inject(AuthService);
  tokenService = inject(TokenService);
  userService = inject(UserService);

  loginForm: FormGroup;
  errorMessage: string = "";
  isLoading: boolean = false;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      identifier: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  user_id: number = 0;

  
  identifier: string = '';

  password: string = '';

  checked: boolean = false;

  onLogin() {
    if (this.loginForm.invalid) {
        this.errorMessage = "Veuillez remplir tous les champs correctement.";
        return;
    }

    const { identifier, password } = this.loginForm.value;  
    
    let processedIdentifier = identifier;
    const isPhone = /^\d{7,15}$/.test(identifier);  

    if (isPhone && !identifier.startsWith('+')) {
      processedIdentifier = '+221' + identifier;
    }
    this.isLoading = true;
    this.authService.login(processedIdentifier, password).subscribe({
        next: (response) => {
            if (response.access_token) {
              
              localStorage.setItem('access_token', response.access_token);
              this.authService.authStatus.next(true)
              this.router.navigate(['/user-dashboard']);

              // if(this.tokenService.getIsChangedPassword()) {
              //   this.router.navigate(['/user-dashboard']);
              // }else {
              //   this.errorMessage = "Votre compte n'est pas actif. Veuillez contacter l'administrateur.";
                
              //   this.router.navigate(['/user-dashboard']);
              // }
            }
            this.isLoading = false; 
        },
        error: (error) => {
            console.error('Login error:', error);
            this.errorMessage = "Nom d'utilisateur ou mot de passe incorrect.";
            this.isLoading = false; 
        }
    });
}



}
