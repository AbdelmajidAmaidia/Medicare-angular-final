import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-front-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgIf, AsyncPipe],
  templateUrl: './front-layout.html',
  styleUrl: './front-layout.scss',
})
export class FrontLayoutComponent {
  protected readonly auth = inject(AuthService);
}