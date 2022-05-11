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