import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, } from "@angular/router";

import { pokeService } from '../../app/app.service';

@Component({
  selector: 'app-generation',
  imports: [ RouterLink],
  templateUrl: './generation.html',
  styleUrl: './generation.css'
})

export class Generation implements OnInit{
  // activated route - inject into - Params will grab it OR url
  // Need to tell angular how to provide the things you want to inject
  Pservice = inject(pokeService);
  route = inject(ActivatedRoute);

  generationId: string = '';

  ngOnInit() {
  // Get the parameter of genID from the current route
    this.route.paramMap.subscribe((params) => {
      this.generationId = params.get('generationId')!;
      console.log(this.generationId);
    });

  // API request to get region
  this.Pservice.getRegion(this.generationId);
  }
}
