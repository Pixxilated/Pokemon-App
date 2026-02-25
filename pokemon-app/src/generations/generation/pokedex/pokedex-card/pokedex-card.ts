import { Component, inject, Input, signal, DestroyRef, Host } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';

import { pokeService } from '../../../../app/app.service';
import { pokedexModel } from './pokedex-card.model';

@Component({
  selector: 'app-pokedex-card',
  imports: [CommonModule, NgClass],
  templateUrl: './pokedex-card.html',
  styleUrl: './pokedex-card.css',
})
export class PokedexCard {
  // Injecting the pokeService to fetch pokemon data
  Pservice = inject(pokeService);
  private destroyRef = inject(DestroyRef);

  // Input for pokemon name - From parent
  @Input({ required: true }) pokemonName!: string;
  pokemon = signal<pokedexModel | null>(null);

  // Every time a new pokemon card is created, grab the information
  // of that pokemon from the service
  ngOnInit() {
    const subscription = this.Pservice.getPokedexInfo(this.pokemonName).subscribe({
      next: (resData) => {
        this.pokemon.set({
          pokemonNum: resData.pokedexNumber,
          pokemonName: resData.pokemonName,
          pokemonSprite: resData.spriteUrl,
          type1: resData.type1,
          type2: resData.type2,
        } as pokedexModel);
        console.log(this.pokemon()!.type1)
        console.log(this.pokemon()?.type2)
      },
    });
    // Destroy to prevent memory leaks
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
