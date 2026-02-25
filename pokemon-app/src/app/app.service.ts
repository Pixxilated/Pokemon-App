import { DestroyRef, inject, Injectable, signal } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { GenerationTemplate } from "../generations/generation/generation.model";
import { pokedexModel } from "../generations/generation/pokedex/pokedex-card/pokedex-card.model";
import { map } from "rxjs";

@Injectable ({
    providedIn: 'root'
})

export class pokeService {
  // response from API call that will tell us the region
  ActiveRegion = signal<string | null>(null);
  private generationNumber = signal<string | null>(null);

  public speciesNames: string[] = [];

  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

    // METHOD - API Call
    // This method will get the region name for the
    // selected generation and set it to the ActiveRegion signal
    getRegion () {
        // Grab our current route - /generations/{id}
        const activeRoute = window.location.pathname;

        // Split the route by its / so we can access the id
        const activeGeneration = activeRoute.split('/')
        console.log(activeGeneration.at(activeGeneration.length-1)) // Number
        this.generationNumber.set(activeGeneration.at(activeGeneration.length-1)!)

        const subscription = this.httpClient
      .get<GenerationTemplate>('https://pokeapi.co/api/v2/generation/' + this.generationNumber())
      .subscribe({
        next: (resData) => {
          const regionName = (resData.main_region.name.charAt(0).toUpperCase() + resData.main_region.name.slice(1));
          this.ActiveRegion.set(regionName)
        }
      });

      // Destroy to prevent memory leaks
        this.destroyRef.onDestroy(() => {
          subscription.unsubscribe();
        });
      };

      // METHOD - API Call
      // This method will get the species names for 
      // the selected generations and set it to the speciesNames array
      getSpeciesNames() {
       // We already have the Generation number
       // Call API to get the species names for the generation
       const subscription2 = this.httpClient
         .get<any>(
           'https://pokeapi.co/api/v2/generation/' + this.generationNumber()
         )
         .subscribe({
           next: (resData) => {
             // resData.pokemon_species is an array of objects with a 'name' property
             // .map() will take each object in the array and return 
             // a new obersvable with just the name property
             this.speciesNames = resData.pokemon_species.map((pokemon_species:any) => pokemon_species.name);
             console.log(this.speciesNames);
           }
         });

         // Destroy to prevent memory leaks
          this.destroyRef.onDestroy(() => {
            subscription2.unsubscribe();
          });
      }

      // METHOD - API Call
      // We now have the species names.. next we need an API
      // call to get the pokedex numbers, sprite URL, types
      // for each pokemon card
      getPokedexInfo(pokemonName: string) {
        // This method will get called for each
        // new pokemon card that is created in the pokedex component
        return this.httpClient
        .get<pokedexModel>('https://pokeapi.co/api/v2/pokemon/' + pokemonName)
        .pipe(
          // We need to map the response data to the pokedexModel interface
          // so we can use it in our pokedex card component
          map((resData: any) => resData = {
            pokemonName: resData.name,
            pokedexNumber: resData.id,
            spriteUrl: resData.sprites.front_default,
            type1: resData.types[0]!.type.name,
            type2: resData.types[1]?.type.name || null
          })
        )
      }
    }