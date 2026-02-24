import { Component, inject, input } from '@angular/core'

import { pokedexModel } from './pokedex-card.model';
import { pokeService } from '../../../app/app.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.html',
  styleUrls: ['./pokedex.css'],
  imports: [],
})
export class Pokedex {
  // This will be the pokedex card for each pokemon species in the generation
  pokeCards = input.required<pokedexModel[]>();
  Pservice = inject(pokeService);
  
}
