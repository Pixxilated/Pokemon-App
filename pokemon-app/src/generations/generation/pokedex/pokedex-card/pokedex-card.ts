import { Component, inject, Input } from '@angular/core';;

import { pokeService } from '../../../../app/app.service';

@Component({
  selector: 'app-pokedex-card',
  imports: [],
  templateUrl: './pokedex-card.html',
  styleUrl: './pokedex-card.css',
})
export class PokedexCard {
  // Injecting the pokeService to fetch pokemon data
  Pservice = inject(pokeService);

  // Input for pokemon name - From parent
  @Input() pokemonName!: string;

  ngOnChanges () {
    // Fetching pokemon data based on the input pokemon name
    this.Pservice.getPokedexInfo(this.pokemonName)
    console.log(this.Pservice.getPokedexInfo(this.pokemonName));
  }
}

