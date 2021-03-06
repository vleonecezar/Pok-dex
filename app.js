const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

let pokeQuantity = 151
let starterNumber = 1

const generatePokemonPromises = (quantity, starter) => (
  Array(quantity).fill().map((_, index) =>
  fetch(getPokemonUrl(starter + index)).then(response => response.json()))
)

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

async function init () {
  const pokemonPromises = generatePokemonPromises(pokeQuantity, starterNumber)

  Promise.all(pokemonPromises)
    .then(generateHTML)
    .then(insertPokemonsIntoPage)
}

init()

document.querySelector('#generations')
  .addEventListener('change', event => {
    const choosenOption = event.target.value

    switch (choosenOption) {
      case 'first':
        pokeQuantity = 151
        starterNumber = 1
        init()
        break;
    
      case 'second':
        pokeQuantity = 100
        starterNumber = 152
        init()
        break;
    
      case 'third':
        pokeQuantity = 135
        starterNumber = 252
        init()
        break;
    
      case 'fourth':
        pokeQuantity = 107
        starterNumber = 387
        init()
        break;
    
      case 'fifth':
        pokeQuantity = 156
        starterNumber = 494
        init()
        break;
    
      case 'sixth':
        pokeQuantity = 72
        starterNumber = 650
        init()
        break;
    
      case 'seventh':
        pokeQuantity = 88
        starterNumber = 722
        init()
        break;
    
      case 'eighth':
        pokeQuantity = 89
        starterNumber = 810
        init()
        break;
    
      default:
        break;
    }
  })