import { Component, OnInit, inject, input } from '@angular/core';

import { pokedexModel } from './pokedex-card.model';
import { GenerationTemplate } from '../generation.model';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.html',
  styleUrls: ['./pokedex.css'],
  imports: [],
})
export class Pokedex {
  pokeCards = input.required<GenerationTemplate[]>();
}
