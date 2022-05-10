$(document).ready(function() {
  var currentDate =  new Date().toLocaleDateString();
  $('#date').html(currentDate); 
if(navigator.geolocation){
  navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords;
   var city = getCity(latitude, longitude);
   weatherApp(latitude, longitude);
  });
}else{
  return false;
}

 function getCity(latitude, longitude) {

  $.ajax({
    url: "https://api.openweathermap.org/geo/1.0/reverse?lat=" + latitude + "&lon=" + longitude + "&limit=5&appid=51f52d4353eea6f6d0ddf19e33425ee2",
    method: 'POST',
    dataType: "jsonp",
    success: function(data, textStatus, jqXHR) {
      var city = data[0].name;
      $('#city').html(city);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      return false
    },
  });
   
 }
  function weatherApp(latitude, longitude) {

    $.ajax({
      url: "https://api.openweathermap.org/data/2.5/onecall?lat="+ latitude + "&lon=" + longitude + "&exclude=minutely,hourly&units=metric&appid=51f52d4353eea6f6d0ddf19e33425ee2",
      method: 'POST',
      dataType: "jsonp",
      contentType: 'application/json; charset=utf-8',
      success: function (result){
        showData(result);
      },
      fail: function (jqXHR, textStatus) {
        alert("Request failed: " + textStatus);
      }
    })
  }

  function showData(data) {
    if (data!= null && data) {
      $('#currentTemp').html(Math.round(data.current.temp) + '&#8451');
      var daily_data = data.daily;
      $('#currentMax').html(Math.round(daily_data[0].temp.max) + '&#8451');
      $('#currentMin').html(Math.round(daily_data[0].temp.min) + '&#8451');
      $('#currentHumidity').html(data.current.humidity);
      $('#currentWind').html(data.current.wind_speed + 'km/h');
      var weather = data.current.weather[0].main;
      var icon = selectIcon(weather);
      $('#currentWeatherIcon').html(icon)
      
      for (let i = 1; i < 7; i++) {
        var date = daily_data[i].dt * 1000;
        var day = new Date(date).toLocaleString('en-us', {weekday:'short'})
        var temp_min = Math.round(daily_data[i].temp.min);
        var temp_max = Math.round(daily_data[i].temp.max);
        var weather = daily_data[i].weather[0].main;
        var icon = selectIcon(weather);
        var week = '<div class="col-2 mt-3">\
          <div class="col weekday" align="center">' + day  + '</div>\
          <div class="col temp" align="center"><span><i class="fa-solid fa-temperature-arrow-up"></i>' + ' ' + temp_max  + '&#8451</span></div>\
          <div class="col temp" align="center"><span><i class="fa-solid fa-temperature-arrow-down"></i>' + ' ' + temp_min  +  '&#8451</span></div>\
          <div class="col" align="center"><span>' + icon + '</span></div>\
      </div>';
        $('#weatherWeek').append(week);
       
      }
    }  
  }

  function selectIcon(weather) {
    switch (weather) {
      case "Clouds":
        return '<i class="fa-solid fa-cloud mt-2" aria-hidden="true"></i>'
        break;
      case "Rain":
        return '<i class="fa-solid fa-cloud-rain mt-2" aria-hidden="true"></i>'
        break;
      case "Thunderstorm":
        var icon = '<i class="fa-solid fa-cloud-bolt mt-2" aria-hidden="true"></i>'
        break;
      case "Drizzle":
        return '<i class="fa-solid fa-cloud-drizzle mt-2" aria-hidden="true"></i>'
        break;
      case "Snow":
        return '<i class="fa-solid fa-cloud-snowmt-2" aria-hidden="true"></i>'
        break;
      case "Clear":
       return '<i class="fa-solid fa-sun mt-2" aria-hidden="true"></i>'
       break;
    } 
  }
})
