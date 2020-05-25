//grabbing the city name from the search bar
var cityName = document.getElementById('myInput');
var form = document.getElementById('form');
form.addEventListener('submit', (e)=>{
  e.preventDefault();
  console.log(cityName.value)
});


//array of cities from local JSON
var cityList = [];
fetch('citiesListUS.json')
    .then(function(response){
        return response.json();
    }).then(function(data){
        for(var i in data){
            cityList.push(data[i].name);
        } 
        console.log(cityList.length)
    });
    
    console.log(cityList.length)


//fetch API. Calling the OpenWeatherMap API
document.getElementById("form").addEventListener('submit', getWeather)
function getWeather(){ 
    fetch("http://api.openweathermap.org/data/2.5/weather?q="+cityName.value+"&APPID=64c4674bb358ce6241ec014179c26214&units=imperial")
    .then((response)=> response.json())
    .then((data)=>{
        var output = ''
        output += '<ul style="list-style: none">' + 
                   '<li> Feels like: ' + data.main.feels_like + '°F</li> <br>' +
                   '<li> Max Temperature: ' + data.main.temp_max+ '°F</li> <br>' +
                   '<li> Min Temperature: ' + data.main.temp_min + '°F</li> <br>' +
                   '<li> Wind Speed: ' + data.wind.speed + ' mph</li>' +
                   '</ul>';
        document.getElementById("cityName").innerHTML = data.name;
        document.getElementById("cityFacts").innerHTML = data.main.temp + '°F';
        document.getElementById("moreDetails").innerHTML = output;
        document.getElementById("longLat").innerHTML = "<br>Longitude: " + data.coord.lon + "&emsp; Latitude: " + data.coord.lat;
    })  
}


//suggestive search function. takes two inputs, the key and the city list array
suggestiveSearch(document.getElementById("myInput"), cityList);
function suggestiveSearch(input, cityArray) {
    input.addEventListener("input", function(e) {
      //this.value is equal to the total input
        var typedValue = this.value;
        closeAllLists();
        if (typedValue.length == 0){ 
          return false;
        }
        var a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        //add input to parent
        this.parentNode.appendChild(a);
        for (var i = 0; i < cityArray.length; i++) {
          if (cityArray[i].substr(0, typedValue.length).toUpperCase() == typedValue.toUpperCase()) {
            var b = document.createElement("DIV");
            b.innerHTML = "<strong>" + cityArray[i].substr(0, typedValue.length) + "</strong>";
            b.innerHTML += cityArray[i].substr(typedValue.length);
            b.innerHTML += "<input type='hidden' value='" + cityArray[i] + "'>";
            b.addEventListener("click", function(e) {
                input.value = this.getElementsByTagName("input")[0].value;
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    function closeAllLists(elmnt) {
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != input) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    //click off to close the search
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
  }
