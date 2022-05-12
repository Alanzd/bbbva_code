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
    getCoordinates($('#cities').val())
      .then(function(coordinates){
        this.weatherApp(coordinates.lat, coordinates.lon);
        $('#city').html($('#cities').val());
      });

  });
});


  


