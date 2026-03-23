import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  currentYear = new Date().getFullYear();

  team = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Chief Medical Officer',
      specialty: 'AI & Medicine',
      initials: 'SC',
    },
    {
      name: 'Michael Johnson',
      role: 'CEO',
      specialty: 'Healthcare Innovation',
      initials: 'MJ',
    },
    {
      name: 'Dr. Aisha Patel',
      role: 'Head of Research',
      specialty: 'Clinical AI',
      initials: 'AP',
    },
  ];

  mission = [
    {
      icon: 'fa-flask',
      title: 'Precision Diagnostics',
      desc: 'AI-powered analysis that detects patterns invisible to the human eye, delivering faster and more accurate diagnoses.',
    },
    {
      icon: 'fa-heart-pulse',
      title: 'Human-Centered Design',
      desc: 'Technology built around clinicians and patients — intuitive, empathetic, and seamlessly integrated into daily care workflows.',
      featured: true,
    },
    {
      icon: 'fa-shield-heart',
      title: 'Ethical AI',
      desc: 'Transparent models, unbiased datasets, and rigorous clinical validation. We hold ourselves to the highest medical standards.',
    },
  ];
}