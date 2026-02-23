import { DestroyRef, inject, Injectable, OnInit, signal } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { GenerationTemplate } from "../generations/generation/generation.model";
import { map } from "rxjs";

@Injectable ({
    providedIn: 'root'
})

export class pokeService implements OnInit{
    // values we want to store from the http request
  private pokemonNum: string[] = [];
  private pokemonSpriteUrl = signal<string | null>(null);
  private pokemonType1 = signal<string | null>(null);
  private pokemonType2 = signal<string | null>(null);

  // response from API call that will tell us the region -- Name aka 1,2,3
  ActiveRegion = signal<string | null>(null);

  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  // Get and set methods for the class
  setGen(mainRegion: string) {
    this.ActiveRegion.set(mainRegion)
  }

  getGen() {
    return this.ActiveRegion;
  }

  setPokeNums(pokeNums: string[]) {
    this.pokemonNum = pokeNums;
  }

  getPokeNums() {
    return this.pokemonNum;
  }

  // API calls
    ngOnInit() {
        // Get the Region Name
        // Make the subscription const so that we can open and close as we see fit
        const subscription2 = this.httpClient
        .get('https://pokeapi.co/api/v2/pokemon/' )
        .subscribe({
        });

        this.destroyRef.onDestroy(() => {
            subscription2.unsubscribe();
        })
    }

    convertNumToRegion () {
        // Grab our current route - /generations/{id}
        const activeRoute = window.location.pathname;
        // Split the route by its / so we can access the id
        const activeGeneration = activeRoute.split('/')
        console.log(activeGeneration.at(activeGeneration.length-1)) // Number
        const genNum = activeGeneration.at(activeGeneration.length-1)!

        const subscription = this.httpClient
      .get<GenerationTemplate>('https://pokeapi.co/api/v2/generation/' + genNum.at(genNum.length-1))
      .pipe(
        map((resData) => ({
          main_region: resData.main_region,
          pokemon_species: resData.pokemon_species.map(pokemon => ({
            name: pokemon.name,
            id: pokemon.url.split('/').filter(Boolean).at(-1)
          })),
          }),
        )
      )
      .subscribe({
        next: (resData) => {
          const regionName = (resData.main_region.name.charAt(0).toUpperCase() + resData.main_region.name.slice(1));
          this.ActiveRegion.set(regionName)

          console.log(resData.pokemon_species)
        }
      });
  
        this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      });
    }
}