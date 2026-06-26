import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor() { }

  async signUp(email: string, pass: string) {
    // Aquí irá la lógica de Firebase:
    // return createUserWithEmailAndPassword(this.auth, email, pass);
  }

  async login(email: string, pass: string) {
    // Aquí irá la lógica de login
  }

  async logout() {
    // Lógica para cerrar sesión
  }
}
