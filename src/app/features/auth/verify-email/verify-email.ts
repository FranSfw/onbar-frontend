import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './verify-email.html'
})
export class VerifyEmailComponent {
  
  resendEmail() {
    console.log('Reenviando correo de verificación...');
  }
}