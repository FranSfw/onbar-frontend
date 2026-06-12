import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Interface para tipar los datos de la receta
export interface RecipeInfo {
  id: string;
  name: string;
  photoURL?: string;
  rating?: number;
  preparationTime: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  user: { id: string; username: string };
}

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './recipe-card.html'
})

export class RecipeCardComponent {
  @Input() recipe!: RecipeInfo;
  @Input() user: any; // Más adelante tiparemos al usuario actual
  @Input() isExpanded: boolean = false;

  defaultImage = 'assets/images/default_recipe.jpg'; // Asegúrate de tener esta imagen
  isFavorited = false;

  // Diccionario para los íconos de dificultad que usas en el HTML
  difficultyIcons: Record<string, { icon: string; label: string }> = {
    'Easy': { icon: 'ph ph-smiley', label: 'Easy' },
    'Medium': { icon: 'ph ph-smiley-wink', label: 'Medium' },
    'Hard': { icon: 'ph ph-chef-hat', label: 'Hard' }
  };

  handleImageError(event: Event) {
    (event.target as HTMLImageElement).src = this.defaultImage;
  }

  goToUserProfile(userId: string) {
    // Aquí luego inyectaremos el Router para navegar
    console.log('Navegando al usuario:', userId);
  }

  toggleFavorite() {
    this.isFavorited = !this.isFavorited;
    // Aquí luego conectaremos con Firebase para guardar favoritos
  }
}