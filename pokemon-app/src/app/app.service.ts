import { DestroyRef, inject, Injectable, OnInit, signal } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { GenerationTemplate } from "../generations/generation/generation.model";

@Injectable ({
    providedIn: 'root'
})

export class pokeService{
  // response from API call that will tell us the region
  ActiveRegion = signal<string | null>(null);
  private generationNumber = signal<string | null>(null);

  public speciesNames: string[] = [];
  public GenRegionSpecies: string[] = [];

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
             // .map() is esentially a for loop that creates a new array with just the names of the pokemon species
             this.speciesNames = resData.pokemon_species.map((pokemon_species:any) => pokemon_species.name);
             console.log(this.speciesNames);
           }
         });

         // Destroy to prevent memory leaks
          this.destroyRef.onDestroy(() => {
            subscription2.unsubscribe();
          });
      }
    }