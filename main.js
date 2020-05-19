const search = document.getElementById('search')
const matchList = document.getElementById('match-list')

//calls function after every input
search.addEventListener('input', () => searchCities(search.value))

//search json of cities
const searchCities =  async searchText => {
    const response = await fetch('cityList.json')
    const cities = await response.json()
    
    //letter by letter matching
    let matches = cities.filter(city =>{
        const regularExp = new RegExp(`^${searchText}`, 'gi')
        return city.name.match(regularExp);
    })

    if(searchText.length === 0){
        matches = []
        matchList.innerHTML = ''
    }

    outputHTML(matches)
}

//show in HTML
const outputHTML = matches =>{
    if(matches.length > 0){
        const html = matches.map(match => 
        `<div class = "mb-1">
            ${match.name}, ${match.country} 
        </div>`)
        .join('')
        matchList.innerHTML = html
    }
}
