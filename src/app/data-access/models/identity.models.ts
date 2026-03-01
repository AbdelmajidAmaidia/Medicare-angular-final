export type UserStatus = 'ACTIVE' | 'SUSPENDED';

export interface AppUser {
  id: string;
  fullName: string;
  email: string;
  status: UserStatus;
  roles: string[];
}