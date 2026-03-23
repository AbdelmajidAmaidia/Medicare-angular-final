import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent {
  currentYear = new Date().getFullYear();

  services = [
    {
      icon: 'fa-video',
      color: 'blue',
      title: 'Consultations en Ligne',
      desc: 'Consultations vidéo et chat avec des médecins certifiés. Accédez à des soins médicaux professionnels depuis le confort de votre maison.',
      features: [
        'Consultations vidéo HD',
        'Chat texte sécurisé',
        'Historique des consultations',
        'Ordonnances numériques',
      ],
    },
    {
      icon: 'fa-brain',
      color: 'cyan',
      title: 'Diagnostics par IA',
      desc: 'Analyse des symptômes alimentée par l\'apprentissage automatique. Notre IA identifie les patterns et fournit des pré-diagnostics précis.',
      features: [
        'Analyse multi-pathologies',
        'Prédictions basées sur l\'IA',
        'Taux de précision 98.4%',
        'Résultats instantanés',
      ],
    },
    {
      icon: 'fa-flask',
      color: 'green',
      title: 'Résultats de Labo',
      desc: 'Résultats de laboratoire numériques avec explications alimentées par IA. Comprenez vos résultats en langage simple.',
      features: [
        'Synchronisation directe',
        'Interprétation IA',
        'Comparaison historique',
        'Alertes automatiques',
      ],
    },
    {
      icon: 'fa-prescription-bottle',
      color: 'orange',
      title: 'Ordonnances Numériques',
      desc: 'Ordonnances numériques envoyées directement aux pharmacies partenaires. Gestion facile des renouvellements.',
      features: [
        'Envoi instantané',
        'QR code sécurisé',
        'Renouvellement en 1 clic',
        'Suivi de statut',
      ],
    },
    {
      icon: 'fa-truck',
      color: 'purple',
      title: 'Livraison de Médicaments',
      desc: 'Les médicaments livrés à votre porte en 24-48 heures. Service de livraison rapide et sécurisé.',
      features: [
        'Livraison rapide',
        'Suivi en temps réel',
        'Livraison gratuite',
        'Emballage sécurisé',
      ],
    },
    {
      icon: 'fa-folder-lock',
      color: 'red',
      title: 'Dossiers Médicaux',
      desc: 'Stockage numérique sécurisé de tous vos dossiers médicaux. Accès contrôlé et chiffrement de bout en bout.',
      features: [
        'Chiffrement E2E',
        'Accès partagé sécurisé',
        'Sauvegarde automatique',
        'Conforme RGPD',
      ],
    },
  ];

  processes = [
    {
      number: 1,
      icon: 'fa-user-check',
      title: 'Créer votre profil',
      desc: 'Inscrivez-vous et remplissez vos informations médicales de base.',
    },
    {
      number: 2,
      icon: 'fa-search',
      title: 'Explorer les services',
      desc: 'Découvrez tous nos services et choisissez ce dont vous avez besoin.',
    },
    {
      number: 3,
      icon: 'fa-clock',
      title: 'Réserver un créneau',
      desc: 'Planifiez une consultation ou un test à votre convenance.',
    },
    {
      number: 4,
      icon: 'fa-check-circle',
      title: 'Obtenir les résultats',
      desc: 'Recevez vos résultats et consultations dans votre tableau de bord.',
    },
  ];

  benefits = [
    {
      icon: 'fa-clock',
      title: '24/7 Disponible',
      desc: 'Accédez à nos services à tout moment, jour et nuit.',
    },
    {
      icon: 'fa-shield-alt',
      title: 'Sécurisé & Privé',
      desc: 'Vos données sont protégées par le chiffrement le plus avancé.',
    },
    {
      icon: 'fa-euro-sign',
      title: 'Prix Transparent',
      desc: 'Pas de frais cachés, tarification claire et honnête.',
    },
    {
      icon: 'fa-headset',
      title: 'Support 24/7',
      desc: 'Notre équipe est toujours disponible pour vous aider.',
    },
  ];
}