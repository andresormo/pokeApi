import { getPokemonFromApi } from "./pokeapi.js"

const lista$$ = document.querySelector('#pokedex')
const input$$ = document.querySelector('#input')

lista$$.className = 'b-list'

const mapPokemons = (pokeArray) => {
    return pokeArray.map((pokemon) => ({
        name: pokemon.name,
        image: pokemon.sprites['front_default'],
        type: pokemon.types.map((type) => type.type.name).join(', '),
        id: pokemon.id
    }))
}

function dibujarPokemon(pokemons) {
   
    lista$$.innerHTML = ''
    for (const pokemon of pokemons) {

        const div$$ = document.createElement('div')
        const pokeTitle$$ = document.createElement('h4')
        pokeTitle$$.innerHTML = pokemon.name
        const figure$$ = document.createElement('figure')
        const img$$ = document.createElement('img')
        img$$.setAttribute('src', `${pokemon.image}`)
        const figcaption$$ = document.createElement('figcaption')
        figcaption$$.innerHTML = pokemon.type

        div$$.className = 'b-card'
        pokeTitle$$.className = 'title b-card_text'
        figure$$.className = 'b-figure'
        img$$.className = 'b-img'
        figcaption$$.className = 'title b-card_text'

        figure$$.appendChild(img$$)
        figure$$.appendChild(figcaption$$)
        div$$.appendChild(pokeTitle$$)
        div$$.appendChild(figure$$)
        lista$$.appendChild(div$$)
    }

}

function pintarBusqueda(pokemons) {
    input$$.addEventListener("input", () => {
        busquedaPokemons(input$$.value, pokemons)
    })
}

function busquedaPokemons(filtro, pokemons) {
    let filteredPokemon = pokemons.filter((pokemon) =>pokemon.name.toLowerCase().includes(filtro.toLowerCase()))
    dibujarPokemon(filteredPokemon)
}


const pokeArray=[]
for (let i = 1; i <= 150; i++) {
    const pokemonObj = await getPokemonFromApi(i)
    pokeArray.push(pokemonObj)
}

function init(){
    const pokeMapped = mapPokemons(pokeArray)
    dibujarPokemon(pokeMapped)
    pintarBusqueda(pokeMapped)
}
init()