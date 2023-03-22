

let locations = [/*arboretum*/{lat:28.600904362555667,lng: -81.19679500000177},/*library*/{lat:28.600904362555667,},{lat:28.600904362555667,},{lat:28.600904362555667,}]

function initMap() {
  var mapoptions = {
    center: { lat:28.602776953885968, lng: -81},
    zoom: 17,
    //mapTypeId:  'satellite',
    disableDefaultUI: true
   // draggable: false
  }

  //mapoptions.center = moveCenterToCurPos()
  
  let map = new google.maps.Map(document.getElementById("map"), mapoptions);
  let navIcon = new google.maps.MarkerImage('mapIcon.png', new google.maps.Size(32, 32) );
  let reqCount = 0;

  let options  = {
    enableHighAccuracy: true
  }
  
  if (navigator.geolocation) {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        var marker = new google.maps.Marker({
          position: pos,
          icon: navIcon,
          map: map
        });

        map.setCenter(pos);
        reqCount++;
        console.log(reqCount);
      },
      () => {
        handleLocationError(true, infoWindow, map.getCenter());
      }
    ,options);
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
  
}
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

window.initMap = initMap;