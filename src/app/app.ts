import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SnackbarComponent } from './shared/components/snackbar/snackbar'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SnackbarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('onbar-frontend');
}