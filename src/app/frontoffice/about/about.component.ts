import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about.component.html',
})
export class AboutComponent {
  team = [
    { name: 'Dr. Sarah Chen', role: 'Chief Medical Officer', specialty: 'AI & Medicine' },
    { name: 'Michael Johnson', role: 'CEO', specialty: 'Healthcare Innovation' },
    { name: 'Dr. Aisha Patel', role: 'Head of Research', specialty: 'Clinical AI' },
  ];
}
