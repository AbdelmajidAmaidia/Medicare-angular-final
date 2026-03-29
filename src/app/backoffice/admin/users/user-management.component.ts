/**
 * @file user-management.component.ts
 * @description Gestion des utilisateurs pour l'administrateur.
 * Permet la recherche, le filtrage par rôle, et la modification du statut des comptes.
 */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/** Rôles disponibles dans l'application */
export type UserRole = 'Patient' | 'Médecin' | 'Labo' | 'Pharmacien' | 'Admin';

/** Statut d'un compte utilisateur */
export type AccountStatus = 'Actif' | 'Suspendu' | 'En attente';

/** Représente un utilisateur de la plateforme */
export interface PlatformUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  joined: string;
  status: AccountStatus;
}

@Component({
  selector: 'app-user-management',
  standalone: true,
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss',
})
export class UserManagementComponent implements OnInit {
  /** Terme de recherche (nom ou email) */
  searchTerm = '';
  /** Filtre par rôle, vide = tous */
  selectedRole: UserRole | '' = '';

  /** Liste complète des utilisateurs (simulation) */
  users: PlatformUser[] = [
    { id: 'USR-001', firstName: 'Sarah', lastName: 'Martinez', email: 'sarah.martinez@example.com', role: 'Patient', joined: '15 Jan 2024', status: 'Actif' },
    { id: 'USR-002', firstName: 'Michael', lastName: 'Chen', email: 'mchen@example.com', role: 'Médecin', joined: '2 Fév 2024', status: 'Actif' },
    { id: 'USR-003', firstName: 'Thomas', lastName: 'Johnson', email: 'tjohnson@example.com', role: 'Labo', joined: '10 Mar 2024', status: 'Actif' },
    { id: 'USR-004', firstName: 'Sophie', lastName: 'Smith', email: 'ssmith@example.com', role: 'Pharmacien', joined: '5 Avr 2024', status: 'Suspendu' },
    { id: 'USR-005', firstName: 'Laura', lastName: 'Durand', email: 'ldurand@example.com', role: 'Patient', joined: '20 Avr 2024', status: 'Actif' },
    { id: 'USR-006', firstName: 'Pierre', lastName: 'Dupont', email: 'pdupont@example.com', role: 'Médecin', joined: '1 Mai 2024', status: 'En attente' },
  ];

  /** Rôles disponibles pour le filtre */
  readonly roles: UserRole[] = ['Patient', 'Médecin', 'Labo', 'Pharmacien', 'Admin'];

  ngOnInit(): void {
    // TODO : charger la liste via un service API
  }

  /** Liste filtrée selon searchTerm et selectedRole */
  get filteredUsers(): PlatformUser[] {
    const term = this.searchTerm.toLowerCase().trim();
    return this.users.filter(u => {
      const matchTerm =
        !term ||
        u.firstName.toLowerCase().includes(term) ||
        u.lastName.toLowerCase().includes(term) ||
        u.email.toLowerCase().includes(term);
      const matchRole = !this.selectedRole || u.role === this.selectedRole;
      return matchTerm && matchRole;
    });
  }

  /** Retourne la classe CSS du badge de statut */
  getStatusClass(status: AccountStatus): string {
    const map: Record<AccountStatus, string> = {
      'Actif': 'status--active',
      'Suspendu': 'status--suspended',
      'En attente': 'status--pending',
    };
    return map[status];
  }

  /** Bascule le statut actif/suspendu d'un utilisateur */
  toggleStatus(user: PlatformUser): void {
    if (user.status === 'Actif') {
      user.status = 'Suspendu';
    } else if (user.status === 'Suspendu') {
      user.status = 'Actif';
    }
    // TODO : appeler l'API pour persister le changement
  }

  /** Déclenche l'édition d'un utilisateur */
  editUser(user: PlatformUser): void {
    // TODO : ouvrir une modale d'édition
    console.info('[UserManagement] Éditer', user.id);
  }

  /** Supprime un utilisateur après confirmation */
  deleteUser(user: PlatformUser): void {
    if (confirm(`Supprimer le compte de ${user.firstName} ${user.lastName} ?`)) {
      this.users = this.users.filter(u => u.id !== user.id);
      // TODO : appeler l'API de suppression
    }
  }
}
