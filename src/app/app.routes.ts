import { Routes } from '@angular/router';
import { AuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

import { RecipeCardComponent } from './shared/components/recipe-card/recipe-card';
import { ProfileEditComponent } from './features/profile/profile-edit/profile-edit';
import { SettingsComponent } from './features/settings/settings/settings';
import { SignUpComponent } from './features/auth/sign-up/sign-up';
import { ReviewCardComponent } from './shared/components/review-card/review-card';
import { LoginComponent } from './features/auth/login/login';
import { ForgotPasswordComponent } from './features/auth/forgot-password/forgot-password';
import { VerifyEmailComponent } from './features/auth/verify-email/verify-email';

// Redirecciones
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['/home']);

export const routes: Routes = [
    // 🔒 Rutas Privadas (Requieren sesión iniciada)
    { 
      path: 'profile-edit', 
      component: ProfileEditComponent, 
      canActivate: [AuthGuard], 
      data: { authGuardPipe: redirectUnauthorizedToLogin } 
    },
    { 
      path: 'settings', 
      component: SettingsComponent, 
      canActivate: [AuthGuard], 
      data: { authGuardPipe: redirectUnauthorizedToLogin } 
    },
    // Dejaremos estas como privadas por ahora, ya que son features internas
    { 
      path: 'recipe-card', 
      component: RecipeCardComponent, 
      canActivate: [AuthGuard], 
      data: { authGuardPipe: redirectUnauthorizedToLogin } 
    },
    { 
      path: 'review-card', 
      component: ReviewCardComponent, 
      canActivate: [AuthGuard], 
      data: { authGuardPipe: redirectUnauthorizedToLogin } 
    },

    // 🌐 Rutas Públicas de Autenticación (No puedes entrar si YA tienes sesión)
    { 
      path: 'sign-up', 
      component: SignUpComponent, 
      canActivate: [AuthGuard], 
      data: { authGuardPipe: redirectLoggedInToHome } 
    },
    { 
      path: 'login', 
      component: LoginComponent, 
      canActivate: [AuthGuard], 
      data: { authGuardPipe: redirectLoggedInToHome } 
    },

    // 🌐 Rutas Públicas Generales
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'verify-email', component: VerifyEmailComponent },
    //{ path: 'home', component: HomeComponent, canActivate: [AuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
    
    // Fallbacks
    { path: '', redirectTo: 'sign-up', pathMatch: 'full' },
    { path: '**', redirectTo: 'sign-up' }
];
