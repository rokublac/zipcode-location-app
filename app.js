
// jshint esversion: 6

function getLocationInfo(e){
	// Get zip value from input
	zip = document.getElementById('zip').value;

	if (zip == ''){
		document.getElementById('msg').innerHTML = '';
		// Currently listening for submit, prevent page reload by default.
		e.preventDefault();
		// Clear all icons when input is empty
		document.querySelector(".icon-remove").style.display = 'none';
		document.querySelector(".icon-check").style.display = 'none';
	} else {
	// Make request with fetch
	fetch(`http://api.zippopotam.us/AU/${zip}`).then(response => {
		// Check status
		if(response.status != 200){
			showIcon('remove');
			document.getElementById('msg').innerHTML = `<article class="message is-danger"><div class="message-body">Invalid postcode, please try again</div></article>`;
			throw Error(response.statusText);
		} else {
			showIcon('check');
			return response.json();
		}
	})
	.then(data => {
		// Show location info
		let output = '';

		data.places.forEach(place => {
			output += `
			<article class="message is-primary">
				<div class="message-header">
					<p>Location Information</p>
					<button class="delete"></button>
				</div>
				<div class="message-body">
					<ul>
						<li><strong>City: </strong>${place['place name']}</li>
						<li><strong>State: </strong>${place.state}</li>
						<li><strong>Longitude: </strong>${place.longitude}</li>
						<li><strong>Latitude: </strong>${place.latitude}</li>
					</ul>
				</div>
			</article>
			`;
		});
		// Insert into output div
		document.getElementById("msg").innerHTML = output;
	})
	.catch(error => console.log(error));

	e.preventDefault();
	}
}

	
function showIcon(icon){
	// Clear icon display
	document.querySelector(".icon-remove").style.display = 'none';
	document.querySelector(".icon-check").style.display = 'none';

	//Show correct icon
	document.querySelector(`.icon-${icon}`).style.display = "inline-flex";

}


// Delete location box
function deleteLocation(e){
	if(e.target.className == 'delete'){
		document.querySelector(".message").remove();

	}
}

// Listen for submit
document.getElementById('zipform').addEventListener('keyup', getLocationInfo);

// Listen for delete
document.querySelector("body").addEventListener('click', deleteLocation);

