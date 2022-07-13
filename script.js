const table = document.getElementById("display-table");
const searchFilter = document.getElementById("search-filter");
const pokemonImg = document.querySelector(".pokemon-img");
const URL = "https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0"
let searchWord = ""
let pokemonData = []

const fetchData = async () => {
  const getData = await fetch(URL);
  return getData.json();
}

const resetTable = () => {
  table.innerHTML = ""
  const tableHead = document.createElement("tr")
  const pokemonNameHead = document.createElement("th")
  pokemonNameHead.innerText = "Pokemon Name"
  const pokemonURLHead = document.createElement("th")
  pokemonURLHead.innerText = "URL"
  tableHead.appendChild(pokemonNameHead)
  tableHead.appendChild(pokemonURLHead)
  table.appendChild(tableHead)
}

const filterData = async (word) => {
  let resp = await fetchData()
  resp.results.forEach(e => {
    if(e.name.includes(word.toLowerCase())){
      let tempData = {
        name: e.name,
        url: e.url
      }
      pokemonData.push(tempData)
    }
  })
}

const generateTable = async () => {
  resetTable();
  await filterData(searchWord);
  pokemonData.forEach( e => {
    const pokemon = document.createElement("tr")
    const pokemonName = document.createElement("td")
    const pokemonUrl = document.createElement("td")
    pokemonName.innerText = e.name
    pokemonUrl.innerText = e.url
    pokemonUrl.classList.add("my-url")
    pokemonUrl.setAttribute("id", "pokemon")
    pokemon.appendChild(pokemonName)
    pokemon.appendChild(pokemonUrl)
    table.appendChild(pokemon)
  })
}

generateTable()
searchFilter.addEventListener("keyup", (e) => {
  searchWord = e.target.value
  pokemonData = []
  generateTable()
})

const fetchDetailPokemon = async (url) => {
  const detailPokemon = await fetch(url)
  return detailPokemon.json()
}

table.addEventListener("click", async (e) => {
  if(e.target.id === "pokemon"){
    let src = ""
    await fetchDetailPokemon(e.target.innerText)
      .then( resp => {
        src = resp.sprites.back_default
      })
    pokemonImg.src = src
  }
})
