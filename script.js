const table = document.getElementById("display-table");
const searchFilter = document.getElementById("search-filter");
const URL = "https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0"
let searchWord = ""

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

const generateTable = async (word) => {
  resetTable()
  let resp = await fetchData()
  resp.results.forEach( e => {
    if(e.name.includes(word)){
      const pokemon = document.createElement("tr")
      const pokemonName = document.createElement("td")
      const pokemonUrl = document.createElement("td")
      pokemonName.innerText = e.name
      pokemonUrl.innerText = e.url
      pokemon.appendChild(pokemonName)
      pokemon.appendChild(pokemonUrl)
      table.appendChild(pokemon)
    }
  })
}

generateTable(searchWord)
searchFilter.addEventListener("keyup", (e) => {
  searchWord = e.target.value
  generateTable(searchWord)
})
