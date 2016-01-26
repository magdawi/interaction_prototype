function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14
  });
  var infoWindow = new google.maps.InfoWindow({map: map});

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    handleLocationError(false, infoWindow, map.getCenter());
  }

  setMarkers(map);
} 

var policeStations = [
  ['P1', 47.809574, 13.042736, 1],
  ['P2', 47.816685, 13.056705, 2],
  ['P3', 47.813515, 13.062958, 4],
  ['P4', 47.810377, 13.053259, 2],
  ['P5', 47.818133, 13.044976, 1],
  ['P6', 47.836288, 13.012704, 1]
];

function setMarkers(map) {
  var image = {
    url: 'img/POLIZEI_PIN.png',
    size: new google.maps.Size(20,32),
    origin: new google.maps.Point(0,0),
    anchor: new google.maps.Point(0,32)
  };

  var shape = {
    coords: [1, 1, 1, 20, 18, 20, 18, 1],
    type: 'poly'
  };
  
  for (var i = 0; i < policeStations.length; i++) {
    var pol = policeStations[i];
    var marker = new google.maps.Marker({
      position: {lat: pol[1], lng: pol[2]},
      map: map,
      icon: image,
      shape: shape,
      title: pol[0],
      zIndex: pol[3]
    });
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}
initMap();