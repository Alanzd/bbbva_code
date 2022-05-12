
/* This function gets latitude and longitude from a city name, if success it calls 
weatherApp.js */

async function getCoordinates(city) {

  var url = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&appid=51f52d4353eea6f6d0ddf19e33425ee2";
  return axios.get(url,{
  })
  .then(function (response) {
    $('.footerNotice').addClass('d-none');
    var latitude = response.data[0].lat;
    var longitude = response.data[0].lon;
    return {
      lat: latitude,
      lon: longitude
    }
  })
  .catch(function (error) {
    $('.footerNotice').removeClass('d-none').html("Request failed: " + error);
  })
}


   