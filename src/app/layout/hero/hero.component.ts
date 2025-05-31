import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TokenService } from '../../core/auth/token.service';
import { FaqComponent } from '../faq/faq.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [ CommonModule, RouterModule, FaqComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  isAuthenticated = false;
  constructor(private tokenService: TokenService){}
  ngOnInit() {
    this.isAuthenticated = this.tokenService.isTokenValid();
  }
  testimonials = [
    {
      name: 'Fatou Ndiaye',
      role: 'Étudiante à Dakar',
      quote:
        "J'ai retrouvé mon téléphone grâce à TROQV. C’est rapide et rassurant. Merci à cette belle initiative !",
    },
    {
      name: 'Moussa Diop',
      role: 'Conducteur de taxi',
      quote:
        "J’ai signalé un passeport trouvé dans ma voiture, et en 2 jours, le propriétaire m’a recontacté.",
    },
    {
      name: 'Awa Ba',
      role: 'Mère de famille',
      quote:
        "Une plateforme qui change la donne au Sénégal. J’ai signalé la perte de ma carte d’identité et quelqu’un l’a retrouvée !",
    },
  ];
}
