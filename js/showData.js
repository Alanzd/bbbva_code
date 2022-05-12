// Draw widget using weather API data

  function showData(data) {
    if (data!= null && data) {
      $('#weatherWeek').empty();
      $('#currentTemp').html(Math.round(data.current.temp) + '&#8451');
      var daily_data = data.daily;
      $('#currentMax').html(Math.round(daily_data[0].temp.max) + '&#8451');
      $('#currentMin').html(Math.round(daily_data[0].temp.min) + '&#8451');
      var sunrise_hour = new Date(data.current.sunrise * 1000).getHours(); 
      var sunrise_minutes = new Date(data.current.sunrise * 1000).getMinutes();
      var sunset_minutes = new Date(data.current.sunset * 1000).getMinutes();
      var sunrise = (sunrise_hour < 10 ? "0" + sunrise_hour : sunrise_hour) + ':' + (sunrise_minutes < 10 ? "0" + sunrise_minutes : sunrise_minutes);
      var sunset = new Date(data.current.sunset * 1000).getHours() + ':' + (sunset_minutes < 10 ? "0" + sunset_minutes : sunset_minutes);
      $('#currentSunrise').html(sunrise);
      $('#currentSunset').html(sunset);
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