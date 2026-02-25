import { Routes } from '@angular/router';

import { Generations } from '../generations/generations';
import { Berries } from '../berries/berries';
import { Encounters } from '../encounters/encounters';
import { Generation } from '../generations/generation/generation';
import { Pokedex } from '../generations/generation/pokedex/pokedex';
import { Abilities } from '../generations/generation/abilities/abilities';
import { Moves } from '../generations/generation/moves/moves';

export const routes: Routes = [
    {
        // This is my list
        path: 'generations',  // <your-domain>/generations so localhost:4200/generations
        component: Generations,
    },
    {
        path: 'generations/:generationId',
        component: Generation
    },
    {
        path: 'generations/:generationId/pokedex',
        component: Pokedex
    },
    {
        path: 'generations/:generationId/abilities',
        component: Abilities
    },
    {
        path: 'generations/:generationId/moves',
        component: Moves
    },
    {
        path: 'berries',  // <your-domain>/generations so localhost:4200/generations
        component: Berries
    },
    {
        path: 'encounters',  // <your-domain>/generations so localhost:4200/generations
        component: Encounters
    }
];
