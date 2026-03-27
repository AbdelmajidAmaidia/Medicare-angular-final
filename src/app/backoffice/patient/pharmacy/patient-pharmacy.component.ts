/**
 * @file patient-pharmacy.component.ts
 * @description Pharmacie en ligne : commande de médicaments sur ordonnance.
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface PharmacyProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  prescription: boolean;
  stock: boolean;
}

@Component({
  selector: 'app-patient-pharmacy',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-container">
      <div class="page-header d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
        <div>
          <h1 class="page-title"><i class="bi bi-shop" style="margin-right:.5rem;color:#3b82f6"></i>Pharmacie en Ligne</h1>
          <p class="page-subtitle">Commandez vos médicaments prescrits</p>
        </div>
        <div class="search-wrap" style="max-width:300px;flex:1;position:relative">
          <i class="bi bi-search" style="position:absolute;left:.75rem;top:50%;transform:translateY(-50%);color:#94a3b8;font-size:.875rem;pointer-events:none"></i>
          <input class="form-control" style="padding-left:2.25rem" [(ngModel)]="searchTerm" placeholder="Rechercher un médicament…" />
        </div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:1rem">
        <div *ngFor="let p of filteredProducts" class="panel p-3" style="background:#fff;border:1px solid #e2e8f0;border-radius:12px">
          <div class="d-flex align-items-start justify-content-between mb-2">
            <h3 style="font-size:.9rem;font-weight:700;margin:0">{{ p.name }}</h3>
            <span class="status-badge" [class.status--active]="p.stock" [class.status--suspended]="!p.stock">
              {{ p.stock ? 'Disponible' : 'Rupture' }}
            </span>
          </div>
          <p class="text-muted small mb-1">{{ p.category }}</p>
          <div class="d-flex align-items-center justify-content-between mt-2">
            <span class="fw-bold text-primary">{{ p.price }} €</span>
            <div class="d-flex gap-1 align-items-center">
              <span *ngIf="p.prescription" class="badge bg-warning text-dark small">Ordonnance</span>
              <button class="btn btn-primary btn-sm" [disabled]="!p.stock">
                <i class="bi bi-cart-plus"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class PatientPharmacyComponent {
  searchTerm = '';

  products: PharmacyProduct[] = [
    { id: 'MED-001', name: 'Metformine 500mg', category: 'Antidiabétique', price: 8.50, prescription: true, stock: true },
    { id: 'MED-002', name: 'Amlodipine 5mg', category: 'Antihypertenseur', price: 12.00, prescription: true, stock: true },
    { id: 'MED-003', name: 'Doliprane 1000mg', category: 'Analgésique', price: 3.20, prescription: false, stock: true },
    { id: 'MED-004', name: 'Ventoline 100µg', category: 'Bronchodilatateur', price: 9.80, prescription: true, stock: false },
    { id: 'MED-005', name: 'Vitamines D3', category: 'Complément', price: 6.50, prescription: false, stock: true },
    { id: 'MED-006', name: 'Ibuprofène 400mg', category: 'Anti-inflammatoire', price: 4.10, prescription: false, stock: true },
  ];

  get filteredProducts(): PharmacyProduct[] {
    const t = this.searchTerm.toLowerCase();
    return !t ? this.products : this.products.filter(p => p.name.toLowerCase().includes(t) || p.category.toLowerCase().includes(t));
  }
}
