// Refresh home page using dynamic url list.
/*$(document).ready(function() {
	$.mobile.changePage("#home");
});*/

// Listen for any attempts to call changePage().
$(document).bind( "pagebeforechange", function(e, data) {
	// We only want to handle changePage() calls where the caller is
	// asking us to load a page by URL.
	if (typeof data.toPage === "string") {
		// We only want to handle a subset of URLs.
		var u = $.mobile.path.parseUrl(data.toPage);
		var favorites = /^#favorites/;
		var delurl = /^#delurl/;
		if (u.hash.search(favorites) !== -1) {
			// Display a list of URLs.
			showFavoritesList(u, data.options);
			e.preventDefault();
		}
		else if (u.hash.search(delurl) !== -1) {
			// Display URL delete confirmation dialog box.
			showDeFavorites(u, data.options);
			e.preventDefault();
		}
	}
});


// When a url is deleted, remove it from the local storage and display the home page.
$(document).on('submit', '#delurl', function(){
	var url = $("#url_value").val();
	delUrl(url);
	$.mobile.changePage("#favorites");
	return false;
})

// Add To Favorites When #addToFavorites button click
$(document).on('click', '#addToFavorites', function(){
	var hotelID      = $( "#hotelID").val();
	var hotelName    = $( "#hotelName").val();
	var hotelClass   = $( "#hotelClass").val();
	var hotelAddress = $( "#hotelAddress").val();
	var hotelImage   = $( "#hotelImage").val();
	//var jsonF = { "name": "John Doe", "age": 29 };
	//alert('hotelID: '+ hotelID +'');
	addUrl(hotelID,hotelName,hotelClass,hotelAddress,hotelImage);
	$.mobile.changePage("#favorites");
	return false;
})

// Display a list of urls you want to share.
function showFavoritesList(urlObj, options) {
	// Get list of urls
	var myFavorites = getmyFavorites();
	console.log(myFavorites);
	// Get the page we are going to write our content into.
	var $page = $("#favorites");
	// Get the content area element for the page.
	var $content = $page.children(":jqmData(role=content)");

	// Build the list of urls.
	var markup = "<ul data-role='listview' data-split-icon='delete'>";
	for (var i = 0 ; i < myFavorites.length ; i++) {
		  if(myFavorites[i].hotelName != '0'){
			  
			  if(myFavorites[i].hotelClass == 0){
					var stars = '★★';
			  }
			  else if(myFavorites[i].hotelClass == 1){
			  	var stars = '★★★';
			  }
			  else if(myFavorites[i].hotelClass == 2){
			  	var stars = '★★★★';
			  }
			  else if(myFavorites[i].hotelClass == 3){
			  	var stars = '★★★★★';
			  }
			  else if(myFavorites[i].hotelClass == 4){
			  	var stars = '★★★★★+';
			  }
			  else{
			  	var stars = '';
			  }
			  
			  //console.log(myFavorites[i]);
			  //console.log(myFavorites[i].hotelName);
			  markup = markup + "<li><img class='Fhotelimages' src='http://www.hotels.co.il/hotelsmain/hotels/hotelimages/" + myFavorites[i].hotelImage + "' /><a onClick='setHotelIDLocalStorage(" + myFavorites[i].hotelID + ");' class='padd_link' href='#hotel_template?url=" + myFavorites[i].hotelID + "'>" + myFavorites[i].hotelName + "<span class='FhotelAddress'>" + myFavorites[i].hotelAddress + "</span><span class='FhotelClass'>" + stars + "</span></a>" + "<a class='del_padd' href='#delurl?url=" + myFavorites[i].hotelID + "' data-rel='dialog'>Delete</a></li>";
		  } //if(myFavorites[i] != 0)
	}
	
	markup = markup + "</ul>";
	// Inject the list markup into the content element.
	$content.html(markup);

	// Pages are lazily enhanced. We call page() on the page
	// element to make sure it is always enhanced before we
	// attempt to enhance the listview markup we just injected.
	$page.page();

	// Enhance the listview we just injected.
	$content.find( ":jqmData(role=listview)" ).listview();
	
	// Now call changePage() and tell it to switch to the page we just modified.
	$.mobile.changePage($page, options);
}


// Display Delete URL confirmation dialog for a specific url passed in as a parameter.
function showDeFavorites(urlObj, options) {
	// Get the url parameter
	var url = decodeURIComponent(urlObj.hash.replace(/.*url=/, ""));
	
	// The pages we use to display our content are already in
	// the DOM. The id of the page we are going to write our
	// content into is specified in the hash before the '?'.
	var	pageSelector = urlObj.hash.replace(/\?.*$/, "");

	// Get the page we are going to write our content into.
	var $page = $(pageSelector);

	// Get the content area element for the page.
	var $content = $page.children(":jqmData(role=content)");

	// Set url elements of the page.
	$content.find("#url_value").val(url);
	$content.find("#url_prompt").html(showDeletedHotel(url));	

	// Pages are lazily enhanced. We call page() on the page
	// element to make sure it is always enhanced.
	$page.page();

	// Now call changePage() and tell it to switch to the page we just modified.
	$.mobile.changePage($page, options);
}


// Retrieve a list of URLs from the local storage. 
// Use defaults if storage has not been initialized yet.
// URLs are serialized using JSON for storage.
function getmyFavorites() {
	var myFavorites;
	var storedUrls = localStorage.getItem("myFavorites");
	if (storedUrls) {
		// Deserialize URLs
		myFavorites = JSON.parse(storedUrls);
	}
	else {
		// Initialize defaults
		myFavorites = [{ "hotelID": 0 , "hotelName": "0" , "hotelClass": 0 , "hotelAddress": "0"  , "hotelImage": "0" }];
		localStorage.setItem("myFavorites", JSON.stringify(myFavorites));
	}
	return myFavorites;
}

// Find URL in the url list.
// Return index or -1 if not found.
function findUrl(hotelID) {
	var index = -1;
	var myFavorites = getmyFavorites();
	for (var i=0; i < myFavorites.length; i++) {
		if (myFavorites[i].hotelID === hotelID) {
			return i;
		}
	}
	return index;
}

// Add a URL to the list.
function addUrl(hotelID,hotelName,hotelClass,hotelAddress,hotelImage) {
	var myFavorites = getmyFavorites();
	// Check for duplicates
	if (findUrl(hotelID) === -1) {
		//var jsonF = '{ "hotelID": '+ hotelID +' , "hotelName": "'+ hotelName +'" , "hotelClass": '+ hotelClass +' , "hotelAddress": "'+ hotelAddress +'" }';
		var jsonF =	[{ "hotelID": hotelID , "hotelName": hotelName , "hotelClass": hotelClass , "hotelAddress": hotelAddress , "hotelImage": hotelImage }];
		myFavorites = myFavorites.concat(jsonF);
		localStorage.setItem("myFavorites", JSON.stringify(myFavorites));
	}
}

// Delete URL from the list.
function delUrl(url) {
	var myFavorites = getmyFavorites();
	var index = findUrl(url);	
	if (index !== -1) {
		myFavorites.splice(index, 1);
		localStorage.setItem("myFavorites", JSON.stringify(myFavorites));
	}	
}

//-------------------------------------------------------------------------------------------------


// Display a list of urls you want to share.
function showDeletedHotel(hotelID){
	// Get list of urls
	var myFavorites = getmyFavorites();
	console.log(myFavorites);

	// Build the list of urls.
	var markup = "<span>";
	for (var i = 0 ; i < myFavorites.length ; i++) {
		  if(myFavorites[i].hotelName != '0'){
			  
			  if(myFavorites[i].hotelID == hotelID){
				  if(myFavorites[i].hotelClass == 0){
						var stars = '★★';
				  }
				  else if(myFavorites[i].hotelClass == 1){
					var stars = '★★★';
				  }
				  else if(myFavorites[i].hotelClass == 2){
					var stars = '★★★★';
				  }
				  else if(myFavorites[i].hotelClass == 3){
					var stars = '★★★★★';
				  }
				  else if(myFavorites[i].hotelClass == 4){
					var stars = '★★★★★+';
				  }
				  else{
					var stars = '';
				  }
				  
				  //console.log(myFavorites[i]);
				  //console.log(myFavorites[i].hotelName);
				  markup = markup + "<img class='Fhotelimages' src='http://www.hotels.co.il/hotelsmain/hotels/hotelimages/" + myFavorites[i].hotelImage + "' /><span class='hotelName'>" + myFavorites[i].hotelName + "</span><span class='FhotelAddress'>" + myFavorites[i].hotelAddress + "</span><span class='FhotelClass'>" + stars + "</span>";
			  } //if(myFavorites[i].hotelID == hotelID)
		  
		  } //if(myFavorites[i] != 0)
	}
	
	markup = markup + "</span>";

	return markup;
}