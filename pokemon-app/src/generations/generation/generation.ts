import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, } from "@angular/router";

import { pokeService } from '../../app/app.service';

@Component({
  selector: 'app-generation',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './generation.html',
  styleUrl: './generation.css'
})

export class Generation implements OnInit {
  // activated route - inject into - Params will grab it OR url
  // Need to tell angular how to provide the things you want to inject
  Pservice = inject(pokeService);

  ngOnInit() {
    // Get the region name for the generation
    this.Pservice.getRegion();
    this.Pservice.getSpeciesNames();
  }
}
