import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent {
  faqs = [
    {
      question: "Qu’est-ce que Track & Find ?",
      answer:
        "Track & Find est une plateforme sécurisée qui permet aux utilisateurs de déclarer, rechercher et suivre des objets perdus ou retrouvés, comme les téléphones, cartes d'identité, passeports ou autres documents importants."
    },
    {
      question: "Puis-je vérifier la légitimité d’un objet avant de l’acheter ?",
      answer:
        "Oui, c’est même l’un des objectifs principaux de Track & Find. Avant d’acheter un objet (téléphone, ordinateur, carte d'identité, etc.), vous pouvez rechercher son numéro de série, IMEI ou identifiant unique sur la plateforme. S’il a été déclaré volé ou perdu, vous serez averti immédiatement. Cela protège les acheteurs contre les arnaques et garantit des transactions plus sûres."
    },
    {
      question: "Quels objets peut-on enregistrer sur Track & Find ?",
      answer:
        "Vous pouvez enregistrer tout objet avec un identifiant unique, comme les téléphones (IMEI), cartes nationales d’identité, passeports, permis de conduire, certificats, etc."
    },
    {
      question: "Puis-je utiliser Track & Find sans créer de compte ?",
      answer:
        "La recherche d’un objet est possible sans compte. Toutefois, pour déclarer un objet perdu ou recevoir des notifications, vous devez être inscrit."
    },
    {
      question: "Comment déclarer un objet perdu ?",
      answer:
        "Vous devez créer un compte, puis accéder à votre espace personnel pour enregistrer un objet perdu. Il suffit d’indiquer le type, la description, et son identifiant unique (IMEI, numéro de série, etc.)."
    },
    {
      question: "Puis-je déclarer un objet retrouvé ?",
      answer:
        "Oui. Track & Find permet également de déclarer un objet trouvé, ce qui aide à reconnecter l’objet à son propriétaire légitime via une recherche croisée sécurisée."
    },
    {
      question: "Que se passe-t-il si quelqu’un recherche mon objet perdu ?",
      answer:
        "Vous recevrez une notification immédiate si quelqu’un effectue une recherche correspondant à l’identifiant de votre objet déclaré. Cela vous permet d’entrer rapidement en contact pour le récupérer."
    },
    {
      question: "Existe-t-il une application mobile ?",
      answer:
        "Oui ! Track & Find est disponible en version mobile pour Android. Elle offre une expérience fluide et optimisée pour vous permettre de déclarer, rechercher ou recevoir des notifications à tout moment."
    },
    {
      question: "Track & Find fonctionne-t-il uniquement au Sénégal ?",
      answer:
        "La plateforme est actuellement centrée sur le Sénégal, mais son architecture permet un déploiement rapide dans d'autres pays africains à moyen terme."
    },
    {
      question: "Mes informations sont-elles sécurisées ?",
      answer:
        "Absolument. Toutes vos données sont protégées par des protocoles de sécurité avancés et ne sont jamais partagées sans votre consentement explicite."
    },
    {
      question: "Que faire si j’ai perdu mon mot de passe ?",
      answer:
        "Cliquez sur 'Mot de passe oublié' à la connexion. Un lien de réinitialisation vous sera envoyé par email."
    },
    {
      question: "Combien coûte l’utilisation de la plateforme ?",
      answer:
        "L’utilisation basique de Track & Find est gratuite. Des services premium pour les professionnels ou institutions sont en cours de développement."
    }
  ];
  
  
}
