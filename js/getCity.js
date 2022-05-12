async function getCity(latitude, longitude) {
  var url = "https://api.openweathermap.org/geo/1.0/reverse?lat=" + latitude + "&lon=" + longitude + "&limit=5&appid=51f52d4353eea6f6d0ddf19e33425ee2";
  return axios.get(url,{
  })
  .then(function (response) {
    var city = response.data[0].name;
    $('#city').html(city);
  })
  .catch(function (error) {
    $('.footerNotice').removeClass('d-none').html("Request failed: " + error);
  })
}

