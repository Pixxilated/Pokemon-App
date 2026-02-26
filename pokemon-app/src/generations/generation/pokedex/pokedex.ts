import { Component, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokedexCard } from './pokedex-card/pokedex-card';
import { pokeService } from '../../../app/app.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.html',
  styleUrls: ['./pokedex.css'],
  imports: [CommonModule, PokedexCard],
})
export class Pokedex implements OnInit {
  // Injecting the pokeService to fetch pokemon data
  Pservice = inject(pokeService);
  private destroyRef = inject(DestroyRef);

  generationId: string = '';
  speciesNames = signal<string[] | null>(null);

  // Inject ActivedRoute
  route = inject(ActivatedRoute);

  // Pagination
  // Set default page to 1
  currentPageNum: number = 1;
  elementNum!: number;
  totalCardsPerPage: number = 20;

  // still need to fix
  totalPages!: number;

  // Method that will handle what element is on what page
  newPage(page: number) {
    // Everytime the button gets selected it will 
    // either feed -1 (which is prev) or 1 (next)
    if(this.currentPageNum === 1 && page === -1) {
      // Do nothing
      console.log("no can do!")
    } else if(this.currentPageNum === this.totalPages && page === 1) {
      console.log("nope")
    } else {
      this.currentPageNum += page;
    }
  }

  ngOnInit() {

    // Get the parameter of genID from the current route
    this.route.paramMap.subscribe((params) => {
      this.generationId = params.get('generationId')!;
    });

    const subscription = this.Pservice.getSpeciesNames(this.generationId).subscribe({
      next: (resData) => {
        // resData.pokemon_species is an array of objects with a 'name' property
        // .map() will take each object in the array and return
        // a new obersvable with just the name property
        this.speciesNames.set(
          resData.pokemon_species.map((pokemon_species: any) => pokemon_species.name),
        );
      },
    });
    // Destroy to prevent memory leaks
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}

