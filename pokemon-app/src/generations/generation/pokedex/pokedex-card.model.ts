export interface pokedexModel {
    pokemonNum: string;
    pokemonName: string;
    pokemonSprite: string;
    pokemonTypes: {
        types: {
            type1: string;
            type2: string | null;
        }
    }
}