import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSwitcherComponent } from '../../shared/language-switcher/language-switcher.component';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, LanguageSwitcherComponent],
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss'],
})
export class PricingComponent {
  currentYear = new Date().getFullYear();
  billingCycle: 'monthly' | 'yearly' = 'monthly';

  plans = [
    {
      name: 'Gratuit',
      icon: 'fa-heart',
      price: '0',
      priceCurrency: '€',
      period: 'pour toujours',
      description: 'Parfait pour découvrir MediCare AI',
      color: 'blue',
      cta: 'Commencer gratuitement',
      ctaSecondary: false,
      features: [
        { text: '5 consultations IA / mois', included: true },
        { text: 'Suivi de santé basique', included: true },
        { text: 'Réservation de rendez-vous', included: true },
        { text: 'Support par email', included: true },
        { text: 'Résultats de labo', included: false },
        { text: 'Équipe de soins dédiée', included: false },
        { text: 'Accès aux spécialistes', included: false },
      ],
    },
    {
      name: 'Plus',
      icon: 'fa-star',
      price: '29',
      priceCurrency: '€',
      period: 'par mois',
      description: 'Pour les patients actifs',
      color: 'cyan',
      cta: 'Essayer 7 jours gratuit',
      ctaSecondary: true,
      popular: true,
      features: [
        { text: 'Consultations IA illimitées', included: true },
        { text: 'Rendez-vous prioritaires', included: true },
        { text: 'Intégration résultats labo', included: true },
        { text: 'Gestion des ordonnances', included: true },
        { text: 'Support par chat 24/7', included: true },
        { text: 'Équipe de soins dédiée', included: false },
        { text: 'Accès aux spécialistes', included: false },
      ],
    },
    {
      name: 'Premium',
      icon: 'fa-crown',
      price: '79',
      priceCurrency: '€',
      period: 'par mois',
      description: 'Pour une santé optimale',
      color: 'green',
      cta: 'Essayer 7 jours gratuit',
      ctaSecondary: true,
      features: [
        { text: 'Tout ce qui est en Plus', included: true },
        { text: 'Équipe de soins dédiée', included: true },
        { text: 'Accès aux spécialistes', included: true },
        { text: 'Tests labo à domicile', included: true },
        { text: 'Support prioritaire 24/7', included: true },
        { text: 'Consultations vidéo illimitées', included: true },
        { text: 'Garantie remboursement 30j', included: true },
      ],
    },
  ];

  faqs: Array<{ q: string; a: string; open: boolean }> = [
    {
      q: 'Puis-je changer de forfait à tout moment?',
      a: 'Oui, vous pouvez upgrader ou downgrader votre forfait à tout moment. Les changements prennent effet immédiatement avec un ajustement proportionnel de votre facture.',
      open: false,
    },
    {
      q: 'Avez-vous une garantie de remboursement?',
      a: 'Absolument! Si vous n\'êtes pas satisfait dans les 30 premiers jours, nous vous remboursons intégralement, sans questions posées.',
      open: false,
    },
    {
      q: 'Les consultations IA comptent-elles dans mon quota?',
      a: 'Les consultations IA font partie de votre forfait. Les forfaits Plus et Premium offrent un accès illimité, tandis que le forfait Gratuit permet 5 consultations par mois.',
      open: false,
    },
    {
      q: 'Y a-t-il des frais cachés?',
      a: 'Non. Le prix que vous voyez est le prix que vous payez. Aucun frais supplémentaire, aucun frais caché. Transparence totale.',
      open: false,
    },
    {
      q: 'Puis-je partager mon compte avec ma famille?',
      a: 'Non, mais nous proposons des forfaits familiaux. Contactez-nous à contact@medicare-ai.tn pour plus d\'informations.',
      open: false,
    },
    {
      q: 'Acceptez-vous l\'assurance maladie?',
      a: 'Nous travaillons actuellement avec plusieurs assureurs. Vérifiez votre couverture ou contactez-nous pour plus de détails.',
      open: false,
    },
  ];
}