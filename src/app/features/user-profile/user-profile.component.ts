import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
import { UserService, UserProfile } from '../../core/services/user.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: UserProfile = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: ''
  };

  loading = false;
  editMode = false;

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {
    this.fetchUserProfile();
  }

  fetchUserProfile(): void {
    this.loading = true;
    this.userService.getUserInfos().subscribe({
      next: (data: UserProfile) => {
        this.user = { ...data, password: '' };
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du profil :', err);
        this.loading = false;
      }
    });
  }

  updateProfile(): void {
    const updatedData = { ...this.user };
    if (!updatedData.password) delete updatedData.password;

    this.loading = true;
    this.userService.updateUser(updatedData).subscribe({
      next: () => {
        this.user.password = '';
        this.editMode = false;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur mise à jour profil :', err);
        this.loading = false;
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
