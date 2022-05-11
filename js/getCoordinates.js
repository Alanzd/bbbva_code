function getCoordinates(city) {
  $.ajax({
    url: "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&appid=51f52d4353eea6f6d0ddf19e33425ee2",
    method: 'POST',
    dataType: "jsonp",
    success: function(data, textStatus, jqXHR) {
      $('.footerNotice').addClass('d-none');
      var latitude = data[0].lat;
      var longitude = data[0].lon;
      weatherApp(latitude, longitude);
      $('#city').html(city);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      $('.footerNotice').removeClass('d-none').html("Request failed: " + textStatus);
    },
  });
}