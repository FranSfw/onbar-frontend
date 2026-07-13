import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth';
import { SnackbarService } from '../../../shared/components/snackbar/snackbar.service';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './verify-email.html'
})
export class VerifyEmailComponent {
  
  constructor(
    private authService: AuthService,
    private snackbar: SnackbarService
  ) {}

  async resendEmail() {
    try {
      this.snackbar.show('Reenviando correo...', 'info');
      await this.authService.sendVerificationEmail();
      this.snackbar.show('¡Correo de verificación reenviado!', 'success');
    } catch (error: any) {
      console.error('Error al reenviar correo:', error);
      this.snackbar.show('Hubo un error al reenviar el correo. Asegúrate de estar registrado.', 'error');
    }
  }
}