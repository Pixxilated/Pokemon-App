import { Component, inject, input, signal } from '@angular/core';;

import { pokeService } from '../../../../app/app.service';
import { pokedexModel } from './pokedex-card.model';

@Component({
  selector: 'app-pokedex-card',
  imports: [],
  templateUrl: './pokedex-card.html',
  styleUrl: './pokedex-card.css',
})
export class PokedexCard {
  Pservice = inject(pokeService);

  // This will be the pokedex card for each pokemon species
  // Grab the pokemon name from the parent component (pokedex)
  pokemonName = input.required<string>();
  pokemon = signal<pokedexModel | null>(null);

  pokemonNameDisplay = signal<string | null>(null);
  pokemonNumDisplay = signal<string | null>(null);
  pokemonSpriteDisplay = signal<string | null>(null);
  pokemonType1Display = signal<string | null>(null);
  pokemonType2Display = signal<string | null>(null);

  // Call API to get 
  // the pokedex number, sprite URL, types for each pokemon card
  ngOnInit() {
    console.log(this.pokemonName());
    this.pokemon.set(this.Pservice.getPokedexInfo(this.pokemonName()));

      this.pokemonNameDisplay.set(this.pokemon()!.pokemonName.toUpperCase() || '');
      this.pokemonNumDisplay.set(this.pokemon()!.pokemonNum.toString().padStart(3, '0') || '');
      this.pokemonSpriteDisplay.set(this.pokemon()!.pokemonSprite || '');
      console.log('Sprite:', this.pokemonSpriteDisplay());
  }
}
