const URL = "https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0"
let searchWord = ""

const initiateHeader = () => {
  $("#display-table").empty()
  $("#display-table").append('<tr><th>Name</th><th>URL</th></tr>')
}

const generateTable = (searchWord) => {
  $.get(URL)
    .done((data) => {
      $.each(data.results, (index, item) => {
        if(item.name.includes(searchWord)){
          $("#display-table").append(`<tr><th>${item.name}</th><th>${item.url}</th></tr>`)
        }
      })
    })
    .fail(() => {
      console.log("Failed")
    })
}

$(() => {
  initiateHeader()
  generateTable(searchWord)
})

$("#search-filter").keyup( e => {
  initiateHeader()
  generateTable(e.target.value)
})

