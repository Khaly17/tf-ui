import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { UserProfile, UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  mobileMenuOpen = false;
  isAuthenticated = false;
  dropdownVisible = false;
  loading = false;

  user: UserProfile = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: ''
  };
  constructor(private eRef: ElementRef, private router: Router, private authService: AuthService, 
    private readonly userService: UserService) {}
  ngOnInit() {
    this.authService.authStatus$.subscribe((status) => {
      this.isAuthenticated = status;
    });
    this.fetchUserProfile();
  }

  gotTologin(){
    
    this.router.navigate(['/login'])
  }
  
  logout() {
    localStorage.removeItem('access_token');
    this.authService.logout();
  }
  
  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.dropdownVisible = false;
      this.mobileMenuOpen = false;
    }
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
    getInitials(first: string, last: string): string {
      const f = first?.trim()?.charAt(0).toUpperCase() || '';
      const l = last?.trim()?.charAt(0).toUpperCase() || '';
      return f + l;
    }
    
  
}
