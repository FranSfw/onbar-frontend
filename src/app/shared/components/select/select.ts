import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select.html'
})
export class SelectComponent {
  @Input() formCategory: string = 'Category';
  @Input() width: string = 'w-full';
  @Input() uniqueId: string = Math.random().toString(36).substr(2, 9);
  @Input() value: string = '';
  @Input() stepId: string = '';

  @Output() valueChange = new EventEmitter<string>();
  @Output() tagsChange = new EventEmitter<any[]>();
  @Output() booleanChange = new EventEmitter<boolean>();

  // Mock de datos para que el HTML no marque error
  selectedTags: any[] = [];
  TagIcon = [
    { value: 'vegan', text: 'Vegan', icon: 'ph-leaf' },
    { value: 'spicy', text: 'Spicy', icon: 'ph-fire' },
    { value: 'gluten-free', text: 'GF', icon: 'ph-wheat-slash' }
  ];
  Measurements = [{ text: 'g' }, { text: 'ml' }, { text: 'oz' }, { text: 'cup' }];

  onParentClick(event: Event) { /* Cierra dropdowns si se hace clic afuera */ }
  
  onDropdown(event: Event) {
    const dropdown = document.getElementById(`dropdown_${this.uniqueId}`);
    if (dropdown) dropdown.classList.toggle('hidden');
  }

  onSelectValue(event: any) {
    this.value = event.target.innerText.trim();
    this.valueChange.emit(this.value);
    this.onDropdown(event); // Cierra al seleccionar
  }

  // Lógica de Etiquetas (Tags)
  isTagSelected(tag: any) { return this.selectedTags.some(t => t.value === tag.value); }
  
  toggleCheckbox(tag: any, event: Event) {
    this.handleTagChange(event, tag);
  }

  handleTagChange(event: Event, tag: any) {
    event.stopPropagation();
    if (this.isTagSelected(tag)) {
      this.selectedTags = this.selectedTags.filter(t => t.value !== tag.value);
    } else {
      this.selectedTags.push(tag);
    }
    this.tagsChange.emit(this.selectedTags);
  }

  onRemoveTag(tag: any, event: Event) {
    event.stopPropagation();
    this.selectedTags = this.selectedTags.filter(t => t.value !== tag.value);
    this.tagsChange.emit(this.selectedTags);
  }

  // Lógica del Switch (Privacidad)
  onToggleChange(event: any) {
    this.booleanChange.emit(event.target.checked);
  }
}