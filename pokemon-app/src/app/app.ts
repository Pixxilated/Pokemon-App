import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';

import { pokeService } from './app.service';
import { Header } from '../header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, Header, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // Get PService
  Pservice = inject(pokeService);

  
}
