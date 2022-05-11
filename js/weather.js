$(document).ready(function() {
  var currentDate =  new Date().toLocaleDateString();
  $('#date').html(currentDate); 

  var cities = ["Albacete","Alicante","Almeria","Avila","Badajoz","Palma","Barcelona","Burgos","Cáceres","Cádiz","Castellón de la Plana","Ciudad Real","Córdoba","Coruña, A","Cuenca","Girona","Granada","Guadalajara","Donostia-San Sebastián","Huelva","Huesca","Jaén","León","Lleida","Logroño","Lugo","Madrid","Málaga","Murcia","Pamplona","Ourense","Oviedo","Palencia","Las Palmas de Gran Canaria","Pontevedra","Salamanca","Santa Cruz de Tenerife","Santander","Segovia","Sevilla","Soria","Tarragona","Teruel","Toledo","Valencia","Valladolid","Bilbao","Zamora","Zaragoza","Ceuta","Melilla", "Vitoria"];
  cities.sort();

  $('#cities')
  .click(function (e) { 
    e.preventDefault();
    initializeSelectMenu(cities);
    cities.map(function (elem, i) {
      $("#cities").append('<option value="'+elem+'">'+ elem +'</option>');
    }); 
  })
  .change(function (e) { 
    e.preventDefault();
    getCoordinates($('#cities').val());    
  });


  function getCoordinates(city) {
    $.ajax({
      url: "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&appid=51f52d4353eea6f6d0ddf19e33425ee2",
      method: 'POST',
      dataType: "jsonp",
      success: function(data, textStatus, jqXHR) {
        var latitude = data[0].lat;
        var longitude = data[0].lon;
        $('#city').html(city);

        weatherApp(latitude, longitude)
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

  function selectIcon(weather) {
    switch (weather) {
      case "Clouds":
        return '<i class="fas fa-cloud mt-2" aria-hidden="true"></i>'
        break;
      case "Rain":
        return '<i class="fas fa-cloud-rain mt-2" aria-hidden="true"></i>'
        break;
      case "Thunderstorm":
        var icon = '<i class="fas fa-cloud-bolt mt-2" aria-hidden="true"></i>'
        break;
      case "Drizzle":
        return '<i class="fas fa-cloud-drizzle mt-2" aria-hidden="true"></i>'
        break;
      case "Snow":
        return '<i class="fas fa-cloud-snowmt-2" aria-hidden="true"></i>'
        break;
      case "Clear":
       return '<i class="fas fa-sun mt-2" aria-hidden="true"></i>'
       break;
    } 
  }
})

function initializeSelectMenu($arraySelectMenu) {
  for (i = 0; i < $arraySelectMenu.length; i++) {
      $($arraySelectMenu[i]).selectmenu({
        classes: { 'ui-selectmenu-button': 'form-control' },
        create: function(e, ui) {
          if ($(this).val()) { $(this).selectmenu('refresh'); }
        },
        change: function(e, ui) {
          if ($(this).val()) { $(this).trigger('change'); }
        },
        position: { my: 'left top', at: 'left bottom', collision: 'flip', using: function(obj, info) {
          var $this = $(this).css('opacity', 0);
    
          if ((info.element.top > 0 && info.element.top < info.target.top) || $(document).height() < info.element.top + info.element.height) {
            $this.addClass('ui-flipped');
          } else {
            $this.removeClass('ui-flipped');
          }
          setTimeout(function() { $('.scrollbar-dynamic').trigger('scroll'); }, 1);
        }}
      })
      .on('change', function(e) {
        $(this).parent().removeClass('ok empty invalid');
        var $btn = $(this).closest('.form').find('button');
        if ($(this).val() || $(this).attr('name') == 'locale') {
          $btn.removeClass('disabled').attr('disabled', false);
        } else {
          $btn.addClass('disabled').attr('disabled', true);
        }
      });
    };
  };
