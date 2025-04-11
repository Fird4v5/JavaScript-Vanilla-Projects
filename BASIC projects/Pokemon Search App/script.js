// DOM Elements

const searchInput = document.getElementById("search-input"); 
const searchButton = document.getElementById("search-button"); 
const searchForm = document.getElementById("search-form"); 
const pokemonSprites = document.getElementById("sprites"); 
const pokemonName = document.getElementById("pokemon-name"); 
const pokemonId = document.getElementById("pokemon-id"); 
const pokemonWeight = document.getElementById("weight"); 
const pokemonHeight = document.getElementById("height"); 
const pokemonTypes = document.getElementById("types"); 
const pokemonHP = document.getElementById("hp"); 
const pokemonAttack = document.getElementById("attack"); 
const pokemonDefense = document.getElementById("defense"); 
const pokemonSpecialAttack = document.getElementById("special-attack"); 
const pokemonSpecialDefense = document.getElementById("special-defense"); 
const pokemonSpeed = document.getElementById("speed"); 

// Utilities 

const pokemonURL = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon"; 


// Fetch Pokémons data 

const fetchPokemons = async (nameOrId) => {
    try {
        const res = await fetch(`${pokemonURL}/${nameOrId}`);
        if (!res.ok) {
            throw new Error (`HTTP error! status: ${res.status}`)
        }
        const data = await res.json(); 
        console.log(data);  
        return data; 
        
    } catch(err) {
        console.log(`Pokemon fetching error: ${err}`); 
        clearPokemon();
        return null; 
    }
}



// Other functions

const findPokemon = async () => { 
    const input = searchInput.value.trim().toLowerCase();
    const pokemon = await fetchPokemons(input); 

    if (!pokemon) {
        alert("Pokémon not found"); 
        return; 
    }

    if (pokemon) {

        const {name, id, weight, height, stats, types, sprites} = pokemon; 
        

        pokemonName.textContent = name.toUpperCase(); 
        pokemonId.textContent = `#${id}`;
        pokemonWeight.textContent = `Weight: ${weight}`; 
        pokemonHeight.textContent = `Height: ${height}`;

        const typeElements = types.map(type => `<span class="type ${type.type.name}">${type.type.name.toUpperCase()}</span>`).join(" "); 
        pokemonTypes.innerHTML = typeElements;

        const sprite = sprites.front_default;
        if (sprite) {
         pokemonSprites.innerHTML = `<img src="${sprite}" id="sprite" alt="${name} avatar">`;
         } else {
        pokemonSprites.innerHTML = "No sprite available";
        }

        pokemonHP.textContent = stats[0].base_stat;
        pokemonAttack.textContent = stats[1].base_stat; 
        pokemonDefense.textContent = stats[2].base_stat; 
        pokemonSpecialAttack.textContent = stats[3].base_stat;
        pokemonSpecialDefense.textContent = stats[4].base_stat; 
        pokemonSpeed.textContent = stats[5].base_stat;
        
    }
}


const clearPokemon = () => {
    pokemonName.textContent = ""; 
    pokemonId.textContent = ""; 
    pokemonWeight.textContent = ""; 
    pokemonHeight.textContent = ""; 
    pokemonTypes.innerHTML = ""; 
    pokemonSprites.innerHTML = ""; 
    pokemonHP.textContent = ""; 
    pokemonAttack.textContent = ""; 
    pokemonDefense.textContent = ""; 
    pokemonSpecialAttack.textContent = ""; 
    pokemonSpecialDefense.textContent = ""; 
    pokemonSpeed.textContent = ""; 
    
}

searchButton.addEventListener("click", findPokemon); 
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    return findPokemon();
})