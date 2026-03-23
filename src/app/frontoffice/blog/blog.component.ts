// src/app/frontoffice/blog/blog.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

export interface BlogPost {
  id: number;
  title: string;
  date: string;
  author: string;
  authorRole: string;
  authorInitials: string;
  authorGradient: string;
  excerpt: string;
  category: string;
  categoryColor: string;
  coverGradient: string;
  coverIcon: string;
  readTime: string;
  tags: string[];
  featured?: boolean;
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {

  currentYear = new Date().getFullYear();

  // Search & filter
  searchQuery    = '';
  activeCategory = 'Tous';
  currentPage    = 1;
  pageSize       = 6;

  // Newsletter
  newsletterEmail = '';
  subscribed      = false;

  categories = ['Tous', 'Intelligence Artificielle', 'Santé Mentale', 'Télémédecine', 'Nutrition', 'Prévention'];

  posts: BlogPost[] = [
    {
      id: 1,
      title: "L'avenir de l'IA dans le diagnostic médical",
      date: '10 Déc 2024',
      author: 'Dr. Salma Chahed',
      authorRole: 'Médecin & Chercheuse IA',
      authorInitials: 'SC',
      authorGradient: 'linear-gradient(135deg, #0A5FD6, #059669)',
      excerpt: "Comment l'intelligence artificielle révolutionne le diagnostic précoce des maladies cardiovasculaires, oncologiques et neurologiques avec une précision inégalée.",
      category: 'Intelligence Artificielle',
      categoryColor: 'blue',
      coverGradient: 'linear-gradient(135deg, #0A5FD6 0%, #063A8A 100%)',
      coverIcon: 'fa-robot',
      readTime: '8 min',
      tags: ['IA', 'Diagnostic', 'Innovation'],
      featured: true,
    },
    {
      id: 2,
      title: 'Reconnaître et prévenir le burnout professionnel',
      date: '5 Déc 2024',
      author: 'Dr. Karim Mansour',
      authorRole: 'Psychiatre',
      authorInitials: 'KM',
      authorGradient: 'linear-gradient(135deg, #7C3AED, #059669)',
      excerpt: "Les signaux d'alerte du burnout, comment les détecter avec les outils numériques modernes et les stratégies de prévention recommandées par les experts.",
      category: 'Santé Mentale',
      categoryColor: 'purple',
      coverGradient: 'linear-gradient(135deg, #7C3AED 0%, #4C1D95 100%)',
      coverIcon: 'fa-brain',
      readTime: '6 min',
      tags: ['Burnout', 'Bien-être', 'Stress'],
    },
    {
      id: 3,
      title: 'Télémédecine : lever les barrières d\'accès aux soins',
      date: '28 Nov 2024',
      author: 'Amina Belhaj',
      authorRole: 'Journaliste Santé',
      authorInitials: 'AB',
      authorGradient: 'linear-gradient(135deg, #0EA5E9, #0A5FD6)',
      excerpt: "La téléconsultation a transformé l'accès aux soins dans les régions rurales et pour les patients à mobilité réduite. Retour sur 3 ans de révolution numérique.",
      category: 'Télémédecine',
      categoryColor: 'cyan',
      coverGradient: 'linear-gradient(135deg, #0EA5E9 0%, #0369A1 100%)',
      coverIcon: 'fa-video',
      readTime: '5 min',
      tags: ['Téléconsultation', 'Accessibilité'],
    },
    {
      id: 4,
      title: 'Ordonnances numériques : guide complet 2024',
      date: '20 Nov 2024',
      author: 'Dr. Mehdi Trabelsi',
      authorRole: 'Pharmacien',
      authorInitials: 'MT',
      authorGradient: 'linear-gradient(135deg, #059669, #0A5FD6)',
      excerpt: "Tout ce que vous devez savoir sur les prescriptions électroniques : sécurité, fonctionnement, avantages et comment les utiliser avec votre pharmacie.",
      category: 'Intelligence Artificielle',
      categoryColor: 'green',
      coverGradient: 'linear-gradient(135deg, #059669 0%, #065F46 100%)',
      coverIcon: 'fa-pills',
      readTime: '4 min',
      tags: ['Ordonnance', 'Numérique', 'Pharmacie'],
    },
    {
      id: 5,
      title: 'Nutrition et immunité : ce que dit la science',
      date: '15 Nov 2024',
      author: 'Dr. Nadia Sfar',
      authorRole: 'Nutritionniste',
      authorInitials: 'NS',
      authorGradient: 'linear-gradient(135deg, #F59E0B, #EF4444)',
      excerpt: "Les aliments qui renforcent réellement votre système immunitaire selon les dernières études scientifiques. Démêler le vrai du faux sur la nutrition.",
      category: 'Nutrition',
      categoryColor: 'orange',
      coverGradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
      coverIcon: 'fa-apple-alt',
      readTime: '7 min',
      tags: ['Immunité', 'Alimentation', 'Prévention'],
    },
    {
      id: 6,
      title: 'Prévention cardiovasculaire : les 5 habitudes clés',
      date: '8 Nov 2024',
      author: 'Dr. Fares Jebali',
      authorRole: 'Cardiologue',
      authorInitials: 'FJ',
      authorGradient: 'linear-gradient(135deg, #EF4444, #7C3AED)',
      excerpt: "Un cardiologue partage les cinq habitudes de vie qui réduisent de 40% le risque de maladies cardiovasculaires, validées par des études à long terme.",
      category: 'Prévention',
      categoryColor: 'red',
      coverGradient: 'linear-gradient(135deg, #EF4444 0%, #991B1B 100%)',
      coverIcon: 'fa-heart',
      readTime: '6 min',
      tags: ['Cœur', 'Prévention', 'Mode de vie'],
    },
    {
      id: 7,
      title: 'Méditation et santé : les preuves scientifiques',
      date: '1 Nov 2024',
      author: 'Dr. Rim Hamdi',
      authorRole: 'Psychologue clinicienne',
      authorInitials: 'RH',
      authorGradient: 'linear-gradient(135deg, #7C3AED, #0EA5E9)',
      excerpt: "Des études de neuroimagerie confirment les effets de la méditation sur le cerveau. Ce que la science dit vraiment sur cette pratique millénaire.",
      category: 'Santé Mentale',
      categoryColor: 'purple',
      coverGradient: 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)',
      coverIcon: 'fa-spa',
      readTime: '5 min',
      tags: ['Méditation', 'Neurologie', 'Bien-être'],
    },
    {
      id: 8,
      title: 'Dossier médical partagé : enjeux et opportunités',
      date: '25 Oct 2024',
      author: 'Ines Labidi',
      authorRole: 'Juriste Santé Numérique',
      authorInitials: 'IL',
      authorGradient: 'linear-gradient(135deg, #0A5FD6, #F59E0B)',
      excerpt: "Le dossier médical partagé soulève des questions légales et éthiques fondamentales. Tour d'horizon des enjeux avec une experte en droit de la santé.",
      category: 'Intelligence Artificielle',
      categoryColor: 'blue',
      coverGradient: 'linear-gradient(135deg, #0A5FD6 0%, #1D4ED8 100%)',
      coverIcon: 'fa-file-medical',
      readTime: '9 min',
      tags: ['DMP', 'Données', 'Éthique'],
    },
    {
      id: 9,
      title: 'Sommeil et performance : comment optimiser votre récupération',
      date: '18 Oct 2024',
      author: 'Dr. Slim Ben Ali',
      authorRole: 'Somnologue',
      authorInitials: 'SB',
      authorGradient: 'linear-gradient(135deg, #0EA5E9, #7C3AED)',
      excerpt: "Le sommeil est le premier médicament. Comprendre les cycles du sommeil et adopter les bons réflexes pour récupérer efficacement.",
      category: 'Prévention',
      categoryColor: 'cyan',
      coverGradient: 'linear-gradient(135deg, #1E3A5F 0%, #0A1628 100%)',
      coverIcon: 'fa-moon',
      readTime: '6 min',
      tags: ['Sommeil', 'Performance', 'Récupération'],
    },
  ];

  // Derived
  featuredPost!: BlogPost;
  filteredPosts: BlogPost[] = [];
  paginatedPosts: BlogPost[] = [];
  totalPages = 1;
  pageNumbers: number[] = [];

  ngOnInit(): void {
    this.featuredPost = this.posts.find(p => p.featured) ?? this.posts[0];
    this.applyFilters();
  }

  setCategory(cat: string): void {
    this.activeCategory = cat;
    this.currentPage = 1;
    this.applyFilters();
  }

  onSearch(): void {
    this.currentPage = 1;
    this.applyFilters();
  }

  resetFilters(): void {
    this.searchQuery    = '';
    this.activeCategory = 'Tous';
    this.currentPage    = 1;
    this.applyFilters();
  }

  applyFilters(): void {
    let result = this.posts.filter(p => !p.featured || !!this.searchQuery);

    if (this.activeCategory !== 'Tous') {
      result = result.filter(p => p.category === this.activeCategory);
    }

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      result = this.posts.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    this.filteredPosts = result;
    this.totalPages    = Math.ceil(result.length / this.pageSize) || 1;
    this.pageNumbers   = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.paginate();
  }

  paginate(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    this.paginatedPosts = this.filteredPosts.slice(start, start + this.pageSize);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.paginate();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  subscribeNewsletter(): void {
    if (this.newsletterEmail) {
      this.subscribed = true;
      this.newsletterEmail = '';
    }
  }
}