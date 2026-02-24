export interface pokedexModel {
    pokemonNum: string;
    pokemonName: string;
    pokemonSprite: string;
    pokemonTypes: {
        type1: string;
        type2: string | null;
    }
}