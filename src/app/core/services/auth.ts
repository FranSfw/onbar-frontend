import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, sendEmailVerification } from '@angular/fire/auth';
import { firstValueFrom } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  
  private auth = inject(Auth);
  private http = inject(HttpClient);

  constructor() { }

  async signUp(email: string, pass: string, extras: { firstName: string; lastName: string; username: string }) {
    try {
      // 1. Crear usuario en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, pass);
      const user = userCredential.user;

      // 2. Crear documento del usuario en Firestore via backend
      const payload = {
        uid: user.uid,
        username: extras.username,
        name: `${extras.firstName} ${extras.lastName}`.trim(),
        email: user.email,
        role: 'barista' as const
      };

      await firstValueFrom(
        this.http.post(`${environment.apiUrl}/users`, payload)
      );

      return user;
    } catch (error) {
      throw error;
    }
  }

  // Método de Login
  async login(email: string, pass: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, pass);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  }

  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(this.auth, provider);
    return result.user;
  }
  
  async sendVerificationEmail() {
    const user = this.auth.currentUser;
    if (user) {
      await sendEmailVerification(user);
    } else {
      throw new Error('No hay usuario autenticado para enviar el correo.');
    }
  }

  async logout() {
    // Lógica para cerrar sesión
  }
}
