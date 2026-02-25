import { Component, inject, input } from '@angular/core'
import { CommonModule } from '@angular/common';

import { PokedexCard } from './pokedex-card/pokedex-card';
import { pokeService } from '../../../app/app.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.html',
  styleUrls: ['./pokedex.css'],
  imports: [CommonModule, PokedexCard],
})
export class Pokedex {
  // Injecting the pokeService to fetch pokemon data
  Pservice = inject(pokeService);
}
