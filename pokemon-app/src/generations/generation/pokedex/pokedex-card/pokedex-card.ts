import { Component, inject, Input, signal, DestroyRef } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';

import { pokeService } from '../../../../app/app.service';
import { pokedexModel } from './pokedex-card.model';
import { ActivatedRoute } from '@angular/router';

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

  generationId: string = '';
  totalCardsPerPage: number= 20;

  // Inject ActivedRoute
  route = inject(ActivatedRoute);

  //ngClass on if the page its on is active or not
  @Input({required: true}) currentPageNum!: number;
  @Input({required: true}) elementNum!: number;

  // Input for pokemon name - From parent
  @Input({ required: true }) pokemonName!: string;
  pokemon = signal<pokedexModel | null>(null);

  // Method that will handle what element is on what page
  isActive(): boolean {
    if(Math.trunc(this.elementNum / this.totalCardsPerPage) === this.currentPageNum) {
      // If the element is on the current page
      // return Active
      return true;
      
    } else {
      // Its not on the current page
      return false;
    }
  }

  // Every time a new pokemon card is created, grab the information
  // of that pokemon from the service
  ngOnInit() {
    // Get the parameter of genID from the current route
    this.route.paramMap.subscribe(params => {
      this.generationId = params.get('generationId')!;
      console.log(this.generationId)
    });
    
    // Now we need to get the species names via the generationID
      this.Pservice.getSpeciesNames(this.generationId);

    // Call API to get the pokemon information
    const subscription = this.Pservice.getPokedexInfo(this.pokemonName).subscribe({
      next: (resData) => {
        this.pokemon.set({
          pokemonNum: resData.pokedexNumber,
          pokemonName: resData.pokemonName,
          pokemonSprite: resData.spriteUrl,
          type1: resData.type1,
          type2: resData.type2,
        } as pokedexModel);
      },
    });
    // Destroy to prevent memory leaks
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
