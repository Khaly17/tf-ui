import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

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

  constructor(private eRef: ElementRef, private router: Router, private authService: AuthService) {}
  ngOnInit() {
    this.authService.authStatus$.subscribe((status) => {
      this.isAuthenticated = status;
    });
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
}
