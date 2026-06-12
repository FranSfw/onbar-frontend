import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../input/input'; // Ajusta la ruta si es necesario

@Component({
  selector: 'app-top-nav',
  standalone: true,
  imports: [CommonModule, InputComponent],
  templateUrl: './top-nav.html'
})
export class TopNavComponent {
  @Input() currentPage: string = 'home';
  @Input() showSearch: boolean = false;
  @Input() user: any = null; 
  @Output() search = new EventEmitter<string>();

  onSearch(event: any) {
    const value = event.target.value;
    this.search.emit(value);
  }
}