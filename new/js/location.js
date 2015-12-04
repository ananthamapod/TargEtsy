// this is called when the browser has shown support of navigator.geolocation
function GEOprocess(position) {
	// update the page to show we have the lat and long and explain what we do next
  document.getElementsByClassName('location-x')[0].innerHTML = position.coords.longitude;
  document.getElementsByClassName('location-y')[0].innerHTML = position.coords.latitude;
}

// this is used when the visitor bottles it and hits the "Don't Share" option
function GEOdeclined(error) {
  document.getElementsByClassName('location-x')[0].innerHTML = 200;
  document.getElementsByClassName('location-y')[0].innerHTML = 200;
}

function findLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(GEOprocess, GEOdeclined);
	}else{
	  document.getElementById('geo').innerHTML = 'Your browser sucks. Upgrade it.';
	}
}

findLocation();