import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Vital para [(ngModel)]

@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-edit.html'
})
export class ProfileEditComponent {
  @Output() closed = new EventEmitter<void>();
  @Output() profileUpdated = new EventEmitter<void>();

  // Objeto base para no tener errores en el HTML
  profile = {
    name: '',
    username: '',
    bio: ''
  };

  coverImage: string | null = null;
  profileImage: string | null = null;
  
  // Rutas de íconos (ajusta según tus assets reales)
  uploadIcon = 'assets/images/upload-icon.svg';
  removeIcon = 'assets/images/remove-icon.svg';

  onProfileFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      // Aquí agregaremos la lógica de previsualización FileReader luego
      console.log('Foto de perfil seleccionada:', file.name);
    }
  }

  onCoverFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      console.log('Foto de portada seleccionada:', file.name);
    }
  }

  removeProfile() { this.profileImage = null; }
  removeCover() { this.coverImage = null; }

  closeModal() {
    this.closed.emit();
  }

  saveProfile() {
    console.log('Guardando datos...', this.profile);
    this.profileUpdated.emit();
    this.closeModal();
  }
}