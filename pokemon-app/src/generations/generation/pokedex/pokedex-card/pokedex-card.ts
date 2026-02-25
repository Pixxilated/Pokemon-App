import { Component, inject, Input, signal, DestroyRef } from '@angular/core';
import { NgStyle } from '@angular/common';

import { pokeService } from '../../../../app/app.service';
import { pokedexModel } from './pokedex-card.model';

@Component({
  selector: 'app-pokedex-card',
  imports: [NgStyle],
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

  hashmap: Map<string, string>;

    // Hash map the colors to their type
    constructor() {
        this.hashmap = new Map();
        this.hashmap.set('normal','#A8A77A');
        this.hashmap.set('fire','#EE8130');
        this.hashmap.set('water','#6390F0');
        this.hashmap.set('electric','#F7D02C');
        this.hashmap.set('grass','#7AC74C');
        this.hashmap.set('ice','#96D9D6');
        this.hashmap.set('fighting','#C22E28');
        this.hashmap.set('poison','#A33EA1');
        this.hashmap.set('ground','#E2BF65');
        this.hashmap.set('flying','#A98FF3');
        this.hashmap.set('psychic','#F95587');
        this.hashmap.set('bug','#A6B91A');
        this.hashmap.set('rock','#B6A136');
        this.hashmap.set('ghost','#735797');
        this.hashmap.set('dragon','#6F35FC');
        this.hashmap.set('dark','#705746');
        this.hashmap.set('steel','#B7B7CE');
        this.hashmap.set('fairy','#D685AD');
    }

  // Every time a new pokemon card is created, grab the information
  // of that pokemon from the service
  ngOnInit() {
    const subscription = this.Pservice.getPokedexInfo(this.pokemonName).subscribe({
      next: (resData) => {
        this.pokemon.set({
          pokemonNum: resData.pokedexNumber,
          pokemonName: resData.pokemonName,
          pokemonSprite: resData.spriteUrl,
          pokemonTypes: resData.pokemonTypes,
        } as pokedexModel);
      },
    });
    // Destroy to prevent memory leaks
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
