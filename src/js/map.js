window. initAutocomplete= function(lat=49.5832541, lng=34.489807) {
      this.lat = lat;
      this.lng = lng;
      console.log(this.lat);
    let map = new google.maps.Map(document.getElementById('mymap'), {
      center: {lat: this.lat, lng: this.lng},
      // center: {lat: 49.5832541, lng: 34.489807},
      zoom: 14,
      mapTypeId: 'roadmap'//відображає типовий перегляд дорожньої карти. 
    });

    // Create the search box and link it to the UI element.
    let input = document.getElementById('pac-input');
    let searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });

    let markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
      let places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      // Clear out the old markers.
      markers.forEach(function(marker) {
        marker.setMap(null);
      });
      markers = [];

      // For each place, get the icon, name and location.
      let bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }
        console.log(place.formatted_address);
        let icon = {
          url: place.icon,
          size: new google.maps.Size(50, 50),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

        // Create a marker for each place.
        markers.push(new google.maps.Marker({
          map: map,
          icon: icon,
          title: place.name+place.formatted_address,
          position: place.geometry.location,
          formatted_address:place.formatted_address,
        }));

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      console.log(markers);
      map.fitBounds(bounds);
    });
  }
  
  // google.maps.event.addDomListener(window, 'load', initAutocomplete);