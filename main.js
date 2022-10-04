var marker;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition)

    } else {}
}

function taruhMarker(map, posisiTitik) {
    if (marker) {
      // meletakkan marker
      marker.setPosition(posisiTitik);
      document.getElementById("end").value = posisiTitik.lat() + "," + posisiTitik.lng();
    } else {
      // membuat marker maru
      marker = new google.maps.Marker({
        position: posisiTitik,
        map: map,
      });

      document.getElementById("end").value = posisiTitik.lat() + "," + posisiTitik.lng();
    }
  }

function showPosition(position) {
    document.getElementById("start").value = position.coords.latitude + "," + position.coords.longitude;
    initialize(position.coords.latitude, position.coords.longitude);
}

getLocation();

function initialize(user_latitude, user_longitude) {

    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();

    var mapOptions = {
        zoom: 8,
        center: new google.maps.LatLng(-7.794915406409172, 110.37020923802413),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var mapElement = document.getElementById('map-canvas');

    var map = new google.maps.Map(mapElement, mapOptions);

    const onClickHandler = function() {
        calculateAndDisplayRoute(directionsService, directionsRenderer);
    };

    google.maps.event.addListener(map, "click", function (event) {
        taruhMarker(this, event.latLng);
      });

    var myMarker = new google.maps.Marker({
        position: new google.maps.LatLng(user_latitude, user_longitude),
        title: "Lokasi Anda : " + user_latitude + " , " + user_longitude,
        map: map,
    });

    setMarkers(map, myMarker);
    directionsRenderer.setMap(map);
    onClickHandler();
    route();

}

function route(){
    calculateAndDisplayRoute(directionsService, directionsRenderer);
}

// Menampilkan rute dari titik user ke titik tujuan
function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    directionsService
        .route({
            origin: {
                query: document.getElementById("start").value,
            },
            destination: {
                query: document.getElementById("end").value,
            },
            travelMode: google.maps.TravelMode.DRIVING,
        })
        .then((response) => {
            directionsRenderer.setDirections(response);
        })
}

function getInfoCallback(map, content) {
    var infowindow = new google.maps.InfoWindow({
        content: content
    });
    return function() {
        infowindow.setContent(content);
        infowindow.open(map, this);
    };
}
document.getElementById("start").value = position.coords.latitude + "," + position.coords.longitude;
google.maps.event.addDomListener(window, 'load', initialize);