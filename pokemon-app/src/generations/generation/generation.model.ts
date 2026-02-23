export interface GenerationTemplate {
    main_region: { 
        name: string
        },
    pokemon_species: {
        map(arg0: (pokemon: any) => { name: any; id: any }): any
        name: string,
        url: string
    }
}