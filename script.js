const listContainer = document.getElementById('pokemon-list');
const detailsContainer = document.getElementById('pokemon-details');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let offset = 0;
const limit = 21;

// Fetch Pokemon List
async function fetchPokemonList() {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    const data = await response.json();
    displayPokemonList(data.results);
}

// Display Pokemon List
function displayPokemonList(pokemonList) {
    listContainer.innerHTML = '';
    pokemonList.forEach(pokemon => {
    const div = document.createElement('div');
    div.classList.add('pokemon-item');
    div.innerHTML = `
    <h3>${pokemon.name.toUpperCase()}</h3>
    <button onclick="viewDetails('${pokemon.name}')">View Details</button>
    `;
    listContainer.appendChild(div);
    });
}

// View Pokémon Details
async function viewDetails(name) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();

    detailsContainer.innerHTML = `
    <h3>${data.name.toUpperCase()}</h3>
    <img src="${data.sprites.front_default}" alt="${data.name}">
    <p><strong>ID:</strong> ${data.id}</p>
    <p><strong>Weight:</strong> ${data.weight}</p>
`;
}

// Pagination
nextBtn.addEventListener('click', () => {
    offset += limit;
    fetchPokemonList();
});

prevBtn.addEventListener('click', () => {
    if (offset >= limit) {
    offset -= limit;
    fetchPokemonList();
    }
});

// Initial Load
fetchPokemonList();
