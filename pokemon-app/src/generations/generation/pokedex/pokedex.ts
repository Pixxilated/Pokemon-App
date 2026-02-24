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
  // This will be the pokedex card for each pokemon species in the generation
  Pservice = inject(pokeService);
}
