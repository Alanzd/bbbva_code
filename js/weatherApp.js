
  function weatherApp(latitude, longitude) {

    var url = "https://api.openweathermap.org/data/2.5/onecall?lat="+ latitude + "&lon=" + longitude + "&exclude=minutely,hourly&units=metric&appid=51f52d4353eea6f6d0ddf19e33425ee2";
    axios.get(url,{
    })
    .then(function (response) {
      $('.footerNotice').addClass('d-none');
      this.showData(response.data);
    })
    .catch(function (error) {
      $('.footerNotice').removeClass('d-none').html("Request failed: " + error);
    })
  
  }