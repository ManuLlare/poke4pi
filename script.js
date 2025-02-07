const pokeCard = document.querySelector('[data-poke-card]');
const pokeName = document.querySelector('[data-poke-name]');
const pokeImg = document.querySelector('[data-poke-img]');
const pokeImgContainer = document.querySelector('[data-poke-img-container]');
const pokeId = document.querySelector('[data-poke-id]');
const pokeTypes = document.querySelector('[data-poke-types]');
const pokeStats = document.querySelector('[data-poke-stats]');

const typeColors = {
    dark: '#344667',
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',  
};


const searchPokemon = event => {
    event.preventDefault();
    const { value } = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        .then(response => renderPokemonData(response))
        .catch(err => renderNotFound())
}

const renderPokemonData = data => {
    const sprite = data.sprites.front_default;
    const { types, stats, abilities } = data; // Agregar 'types' aquí

    pokeName.textContent = data.name;
    pokeImg.setAttribute('src', sprite);
    pokeId.textContent = `Nº ${data.id}`;
    setCardColor(types);
    renderPokemonStatsAndAbilities(stats, abilities);
    renderPokemonTypes(types); // Llamar a la función para mostrar los tipos
}



const renderPokemonStatsAndAbilities = (stats, abilities) => {
    pokeStats.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    });

    const abilitiesContainer = document.querySelector('[data-poke-abilities]');
    abilitiesContainer.innerHTML = '';

    abilities.forEach(abilityData => {
        const abilityName = abilityData.ability.name;

        fetch(abilityData.ability.url)
            .then(response => response.json())
            .then(abilityData => {
                const abilityDescription = abilityData.effect_entries.find(entry => entry.language.name === "en").short_effect;

                const abilityElement = document.createElement("div");
                abilityElement.textContent = "Ability: " + abilityName;
                const descriptionElement = document.createElement("div");
                descriptionElement.textContent = "Description: " + abilityDescription;

                abilitiesContainer.appendChild(abilityElement);
                abilitiesContainer.appendChild(descriptionElement);
            })
            .catch(error => {
                console.error("Error: " + error);
            });
    });
}


const setCardColor = types => {
    const colorOne = typeColors[types[0].type.name];
    const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;
    pokeImg.style.backgroundColor = colorOne; // Cambia el color de fondo
    pokeImg.style.color = '#FFF'; // Cambia el color del texto a blanco
}


const renderPokemonTypes = types => {
    pokeTypes.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.backgroundColor = typeColors[type.type.name]; // Cambia el color de fondo
        typeTextElement.style.color = '#FFF'; // Cambia el color del texto a blanco
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
    });
}




