import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet, RouterLink, } from "@angular/router";
import { map } from 'rxjs';

import { GenerationTemplate } from './generation.model';
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

  // This will get the generations Main Region
  // https://pokeapi.co/api/v2/generation/{id or name}/

  ngOnInit() {
    this.Pservice.convertNumToRegion();
  }
}
