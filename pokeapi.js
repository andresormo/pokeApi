export async function getPokemonFromApi (num){
    const resultado = await fetch(`https://pokeapi.co/api/v2/pokemon/${num}`);
    const pokemonObj = await resultado.json()
    return pokemonObj
}
