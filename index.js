
//const {PinView} = await google.map.importLibrary("marker")
let locations = [
  /*arboretum*/{lat:28.600904362555667,lng: -81.19679500000177},
  /*library*/{lat:28.600582998057156,lng: -81.20146960470308},
  /*gym*/{lat:28.597130866415107,lng: -81.20287147915882},
  /*cb1*/{lat:28.603733242308454,lng: -81.20054998037958},
  /*student union*/{lat:28.60160681694149,lng: -81.20044675481425},
  /*eng II*/{lat:28.601418424934305,lng: -81.19848337782615}
]

function initMap() {
  var mapoptions = {
    center: { lat:28.602776953885968, lng: -81},
    zoom: 17,
    mapId:  '6a034a94ab148b12',
    disableDefaultUI: true,
    clickableIcons: false
   // draggable: false
  }

  //mapoptions.center = moveCenterToCurPos()
  
  let map = new google.maps.Map(document.getElementById("map"), mapoptions);
  let navIcon = new google.maps.MarkerImage('mapIcon.png', new google.maps.Size(32, 32) );
  let reqCount = 0;

  let options  = {
    enableHighAccuracy: true
  }

  //add markers
  
  
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
  for(let x=0;x<locations.length;x++){
    const pinViewBackground = new google.maps.marker.PinView({
      background: "#333333",
      borderColor: "#FFD700",
      glyphColor: "#FFD700"
    });
    const markerViewBackground = new google.maps.marker.AdvancedMarkerView({
      map,
      position: locations[x],
      content: pinViewBackground.element,
    });
    console.log(locations[x]);
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