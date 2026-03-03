import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog.component.html',
})
export class BlogComponent {
  posts = [
    { title: 'The Future of AI in Healthcare', date: 'Dec 10, 2024', author: 'Dr. Sarah Chen', excerpt: 'How artificial intelligence is revolutionizing medical diagnosis.' },
    { title: 'Understanding Digital Prescriptions', date: 'Dec 5, 2024', author: 'Michael Johnson', excerpt: 'A guide to the new era of electronic prescriptions.' },
    { title: 'Telemedicine: Breaking Barriers', date: 'Nov 28, 2024', author: 'Dr. Aisha Patel', excerpt: 'How remote consultations are making healthcare accessible.' },
  ];
}
