// src/app/frontoffice/landing/landing.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {

  currentYear = new Date().getFullYear();
  openFaq: number | null = null;

  stats = [
    { value: '50 000+', label: 'Patients actifs' },
    { value: '1 200+', label: 'Diagnostics / jour' },
    { value: '98.4%',  label: 'Précision IA' },
    { value: '4.9/5',  label: 'Satisfaction' },
  ];

  features = [
    {
      icon: 'fa-robot',
      color: 'blue',
      title: 'IA Diagnostique',
      desc: 'Notre moteur d\'IA analyse vos symptômes et antécédents médicaux pour fournir des diagnostics rapides et précis.',
      points: [
        'Analyse multi-pathologies',
        'Suggestions de spécialistes',
        'Rapport PDF généré automatiquement',
      ],
    },
    {
      icon: 'fa-brain',
      color: 'green',
      title: 'Santé Mentale',
      desc: 'Détection du stress, de l\'anxiété et du burnout via reconnaissance faciale et suivi comportemental.',
      points: [
        'Analyse faciale en temps réel',
        'Score bien-être quotidien',
        'Alertes préventives',
      ],
    },
    {
      icon: 'fa-calendar-check',
      color: 'cyan',
      title: 'Rendez-vous Smart',
      desc: 'Système de planification intelligent qui optimise les créneaux et réduit les temps d\'attente.',
      points: [
        'Réservation instantanée',
        'Rappels automatiques',
        'Téléconsultation intégrée',
      ],
    },
    {
      icon: 'fa-flask',
      color: 'orange',
      title: 'Résultats de Labo',
      desc: 'Consultez vos résultats biologiques et obtenez une explication claire en langage naturel.',
      points: [
        'Synchronisation directe',
        'Interprétation IA',
        'Historique complet',
      ],
    },
    {
      icon: 'fa-pills',
      color: 'purple',
      title: 'Ordonnances Digitales',
      desc: 'Gérez, renouvelez et envoyez vos ordonnances directement à votre pharmacie partenaire.',
      points: [
        'QR code sécurisé',
        'Renouvellement en 1 clic',
        'Rappels de prise',
      ],
    },
    {
      icon: 'fa-shield-heart',
      color: 'red',
      title: 'Dossier Médical',
      desc: 'Un dossier médical unifié, sécurisé et accessible par votre équipe soignante autorisée.',
      points: [
        'Chiffrement de bout en bout',
        'Accès partagé sécurisé',
        'Export FHIR compatible',
      ],
    },
  ];

  steps = [
    {
      icon: 'fa-user-plus',
      title: 'Créez votre compte',
      desc: 'Inscription en 2 minutes avec validation d\'identité sécurisée. Renseignez votre profil médical de base.',
    },
    {
      icon: 'fa-stethoscope',
      title: 'Décrivez vos symptômes',
      desc: 'Notre IA analyse vos symptômes, votre historique et vos constantes pour établir un pré-diagnostic.',
    },
    {
      icon: 'fa-heart-pulse',
      title: 'Recevez votre suivi',
      desc: 'Consultez votre bilan de santé, prenez rendez-vous et suivez votre évolution en temps réel.',
    },
  ];

  testimonials = [
    {
      text: 'MediCare AI a détecté mon niveau de stress bien avant que je ne réalise à quel point j\'étais épuisée. Le suivi est incroyablement précis.',
      name: 'Salma B.',
      role: 'Enseignante, Tunis',
      initials: 'SB',
    },
    {
      text: 'En tant que médecin, j\'apprécie la qualité des pré-diagnostics. Cela me permet de me concentrer sur les cas complexes et de mieux servir mes patients.',
      name: 'Dr. Karim M.',
      role: 'Médecin généraliste, Sfax',
      initials: 'KM',
    },
    {
      text: 'La gestion de mes ordonnances et rendez-vous sur une seule plateforme est un vrai gain de temps. Je recommande à toute ma famille.',
      name: 'Mehdi T.',
      role: 'Entrepreneur, Sousse',
      initials: 'MT',
    },
  ];

  faqItems = [
    {
      q: 'MediCare AI remplace-t-il un médecin ?',
      a: 'Non. MediCare AI est un outil d\'aide à la décision médicale. Il complète l\'expertise du médecin en fournissant des analyses préliminaires et un suivi continu, mais ne se substitue jamais à une consultation médicale professionnelle.',
    },
    {
      q: 'Mes données de santé sont-elles sécurisées ?',
      a: 'Absolument. Toutes vos données sont chiffrées de bout en bout, hébergées sur des serveurs certifiés HDS (Hébergeur de Données de Santé) et traitées en conformité totale avec le RGPD. Vous gardez le contrôle total sur vos données.',
    },
    {
      q: 'La plateforme est-elle gratuite ?',
      a: 'Un accès de base est disponible gratuitement avec les fonctionnalités essentielles. Des formules Premium offrent l\'accès à l\'analyse IA avancée, la téléconsultation illimitée et le dossier médical complet.',
    },
    {
      q: 'Comment fonctionne la détection du stress par IA ?',
      a: 'Notre système analyse des micro-expressions faciales via votre caméra (avec votre consentement explicite), combinées à vos données de sommeil et d\'activité, pour calculer un indice de bien-être mental quotidien.',
    },
    {
      q: 'Puis-je utiliser MediCare AI pour mes enfants ?',
      a: 'Oui. La plateforme prend en charge des profils familiaux. Un parent peut gérer les dossiers de santé de ses enfants mineurs avec des parcours adaptés à chaque tranche d\'âge.',
    },
  ];

  toggleFaq(i: number): void {
    this.openFaq = this.openFaq === i ? null : i;
  }
}