
  function weatherApp(latitude, longitude) {

    $.ajax({
      url: "https://api.openweathermap.org/data/2.5/onecall?lat="+ latitude + "&lon=" + longitude + "&exclude=minutely,hourly&units=metric&appid=51f52d4353eea6f6d0ddf19e33425ee2",
      method: 'POST',
      dataType: "jsonp",
      contentType: 'application/json; charset=utf-8',
      success: function (result){
        $('.footerNotice').addClass('d-none');
        showData(result)
      },
      error: function (jqXHR, textStatus) {
        $('.footerNotice').removeClass('d-none').html("Request failed: " + textStatus);
      }
    })
  }