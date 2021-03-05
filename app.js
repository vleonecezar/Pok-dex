const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const pokeQuantity = 898

const generatePokemonPromises = () => Array(pokeQuantity).fill().map((_, index) =>
  fetch(getPokemonUrl(index + 1)).then(response => response.json()))

const generateHTML = pokemons => pokemons.reduce((acc, { name, id, types }) => {
    const elementTypes = types.map(typeInfo => typeInfo.type.name)

    acc += `
      <li class="card ${elementTypes[0]}">
        <img class="card-image" alt="${name}" src="https://pokeres.bastionbot.org/images/pokemon/${id}.png"/>
        <h2 class="card-title">${id}. ${name}</h2>
        <p class="card-subtitle">${elementTypes.join(' | ')}</p>
      </li>
    `
  return acc
}, '')


const insertPokemonsIntoPage = pokemons => {
  const ul = document.querySelector('[data-js="pokedex"]')
  ul.innerHTML = pokemons
}

async function init (first, last) {
  const pokemonPromises = generatePokemonPromises()

  Promise.all(pokemonPromises.slice(first, last))
    .then(generateHTML)
    .then(insertPokemonsIntoPage)
}

init(0, 151)

document.querySelector('#generations')
  .addEventListener('change', event => {
    const choosenOption = event.target.value

    switch (choosenOption) {
      case 'first':
        init(0, 151)
        break;
    
      case 'second':
        init(151, 251)
        break;
    
      case 'third':
        init(251, 386)
        break;
    
      case 'fourth':
        init(386, 493)
        break;
    
      case 'fifth':
        init(493, 649)
        break;
    
      case 'sixth':
        init(649, 721)
        break;
    
      case 'seventh':
        init(721, 809)
        break;
    
      case 'eighth':
        init(809, 898)
        break;
    
      default:
        break;
    }
  })