(function($) {
  var url = 'http://app.hotels.co.il/json/GetHomePageComponent.php';
  $.ajax({
	  type: 'GET',
	  url: url,
	  async: false,
	  jsonpCallback: 'GetHomePageComponent',
	  contentType: "application/json",
	  dataType: 'jsonp',
	  fixture: false,
	  success: function(data){
		 //console.dir(data.GroupSales);	
		 //console.log(data);
		 /*console.log(data.GroupSales[0]);
		 console.log(data.GroupSales[0].PICTURE);
		 console.log(data.GroupSales[0].HOTELNAME);*/
		 
		 //--------------------------------------------------------------------------------------
	
		  $.each(data, function(){
			  /*if(this.Link == 'holiday.html'){
				  var link = '<a href="'+this.Link+'" data-transition="slide">';
			  }
			  else{
				  var link = '<a href="#'+this.Link+'" data-transition="slide">';
			  }*/
			  if(this.CatType){
				  $('#homePage').append(
					  '<li id="post-'+this.ID+'">'
						  + '<a href="#'+this.Link+'" data-transition="slide" onClick="setCatTypeLocalStorage(\'' + this.CatType + '\')">'
								  + '<img class="GroupSaleImage" src="' + this.Image + '" />'
								  + '<div class="title">'
									  + this.Title
								  + '</div>'
						  + '</a>'
					  +'</li>'
			  		);
			  }
			  else{
			  		$('#homePage').append(
					  '<li id="post-'+this.ID+'">'
						  + '<a href="#'+this.Link+'" data-transition="slide">'
								  + '<img class="GroupSaleImage" src="' + this.Image + ' " />'
								  + '<div class="title">'
									  + this.Title
								  + '</div>'
						  + '</a>'
					  +'</li>'
			  		);
			  }
			  
		  });
		  
		 //--------------------------------------------------------------------------------------
	  },
	  error: function(e) {
		 console.log(e.message);
	  }
	}); //$.ajax({
})(jQuery);

/*var panel = '<div data-role="panel" id="myPanel" data-position="right" data-display="push" data-dismissible="true">' 
                + '<h2>דילים לפי איזור</h2>'
				+ '<ul>'
                	+ '<li><a class="locationLink" href="#general_page" data-transition="slide" data-location="5">דילים לאילת</a></li>'
                    + '<li><a class="locationLink" href="#general_page" data-transition="slide" data-location="9">דילים לתל אביב</a></li>'
                    + '<li><a class="locationLink" href="#general_page" data-transition="slide" data-location="4">דילים לים המלח</a></li>'
                    + '<li><a class="locationLink" href="#general_page" data-transition="slide" data-location="3">דילים לירושלים</a></li>'
                    + '<li><a class="locationLink" href="#general_page" data-transition="slide" data-location="15">דילים לכנרת</a></li>'
                + '</ul>'
			+ '</div>';

$(document).on('pagebeforecreate', function (){
    $.mobile.pageContainer.prepend(panel);
    $("#myPanel").panel().enhanceWithin();
});*/

$(document).on('pagebeforeshow', '#home_page', function(e, data){
	var storedUrls = localStorage.getItem("myFavorites");
	var myFavorites = JSON.parse(storedUrls);
	console.log(myFavorites);
	if(myFavorites){
		var length = myFavorites.length;
		console.log(length);
		if(length == 1){
			$( "#home_page .real-add-to" ).hide();
		}
		else{
			$( "#home_page .real-add-to" ).show();
		}
	}
	else{
		$( "#home_page .real-add-to" ).hide();
	}
	$('.myPanel').load('includes/menu_home.html');
}); //$(document).on('pagebeforeshow', '#home_page', function(e, data)
//--------------------------------------------------------------------------------
/*$(document).on('pagebeforecreate', '#home_page, #general_page', function(){ 
    //$('<div>').attr({'data-role':'header','data-theme':'b','data-position':'fixed','data-id':'footer'}).append('<h3>Article</h3>').appendTo($(this));
    //$('<div>').attr({'data-role':'footer','data-theme':'b','data-position':'fixed','data-id':'footer'}).append('<h3>Article footer</h3>').appendTo($(this));
	//$('#home_page').load('header.html');
});*/

$('a.locationLink').click(function (){
	//alert($(this).data("location"));
	var Cat   = $(this).data("cat");
	var LocID = $(this).data("location");
		// Store
		localStorage.setItem("LocID", LocID);
		localStorage.setItem("Cat", Cat);
		// Retrieve
		//document.getElementById("result").innerHTML = localStorage.getItem("lastname");
}); //$('a').click(function ()

$(document).on('pagebeforeshow', '#general_page', function(e, data){

	$('#myFilter').val("");
	$('#GroupSales').empty();
	
	var LocID = localStorage.getItem("LocID");
	var Cat   = localStorage.getItem("Cat");
	
	if(Cat == 'deals'){
		(function($){
			var url = 'http://www.hotels.co.il/json/JPgroupSale.cfc?method=GetGroupSales&LocID='+LocID+'';
			  $.ajax({
				type: 'GET',
				url: url,
				async: false,
				jsonpCallback: 'CBGroupSale',
				contentType: "application/json",
				dataType: 'jsonp',
				fixture: false,
				success: function(data) {
				   /*console.dir(data.GroupSales);
				   console.log(data.GroupSales.length);
				   console.log(data.GroupSales[0]);*/
				   /*console.log(data.GroupSales[0].PICTURE);
				   console.log(data.GroupSales[0].HOTELNAME);*/
				   //console.log(data.GroupSales[0]);
				   
				   //--------------------------------------------------------------------------------------
			
					$.each(data.GroupSales, function(){
						if(this.SALENIGHTS == 1){
							var NIGHTS = 'לילה אחד';
						}else{
							var NIGHTS = this.SALENIGHTS + ' לילות';
						}
						var url = 'http://www.hotels.co.il/hotelsmain/hotels/hotel-groupsale.cfm?hotelid='+ this.HOTELID +'&groupsaleid='+ this.GROUPSALEID +'';
						
						if(this.CLASS == 0){
							var starsImg = 2;
							var stars = '★★';
						}
						else if(this.CLASS == 1){
							var starsImg = 3;
							var stars = '★★★';
						}
						else if(this.CLASS == 2){
							var starsImg = 4;
							var stars = '★★★★';
						}
						else if(this.CLASS == 3){
							var starsImg = 5;
							var stars = '★★★★★';
						}
						else if(this.CLASS == 4){
							var starsImg = 6;
							var stars = '★★★★★+';
						}
						else{
							var starsImg = 'noimg';
							var stars = '';
						}
						
						$('#GroupSales').append(
							'<li id="'+ this.GROUPSALEID +'">'
								+ '<a href="'+url+'">'
									+ '<div class="GroupSale">'
										+ '<h2>'
											+ this.HOTELNAME
											+ '<span class="hotel_star">' + stars + '</span>'
											//+ '<img class="hotelStars" src="http://www.hotels.co.il/app/images/' + starsImg +'stars.png" />'
										+ '</h2>'
										+ '<img class="GroupSaleImage" src="http://www.hotels.co.il/hotelsmain/hotels/hotelimages/' + this.PICTURE + ' " />'
										+ '<div class="GroupSaleText">'
											+ '<div class="GroupSaleDate">'
												+ this.SALESTARTDATE + ' - ' + this.SALEENDDATE
											+ '</div>'
											+ '<div class="GROUPSALENAME">'
												+ this.GROUPSALENAME
											+ '</div>'
										+ '</div>'
										+ '<div class="GroupSalePrice">'
												+ '<div class="SALENIGHTS">'
													+ NIGHTS
												+ '</div>'
												+ '<span class="CURRENCY">'
													+ this.CURRENCY
												+ '</span>'
												+ this.SALEPRICE + '<s>'+ this.CURRENCY + this.PRICE +'</s>'
												+ '<div class="BOARDTYPE">'
													+ this.BOARDTYPE
												+ '</div>'
											+ '</div>'
									+ '</div>'
								+ '</a>'
							+'</li>'
						);
					});
					
					/*var text = "";
					for (i = 0 ; i < data.GroupSales.length ; i++){ 
						text += data.GroupSales[i].HOTELNAME + "<br>";
					}
					$(".hotel").append(text);*/
					
				   //--------------------------------------------------------------------------------------
				},
				error: function(e) {
				   console.log(e.message);
				}
			});
		})(jQuery);
	
		$("#general_page ul").removeClass( "hotelsLi" );
	
	} //if(Cat == 'deals')
	else if(Cat == 'hotels'){
		(function($){
			var url = 'http://www.hotels.co.il/json/hotels_ws.cfc?method=ListHotels&level2='+LocID+'';
			$.ajax({
			  type: 'GET',
			  url: url,
			  async: false,
			  jsonpCallback: 'CBHotels',
			  contentType: "application/json",
			  dataType: 'jsonp',
			  fixture: false,
			  success: function(data) {
				 /*console.dir(data.Hotels);
				 console.log(data.Hotels);
				 console.log(data.Hotels.length);*/
				 /*console.log(data.GroupSales[0].PICTURE);
				 console.log(data.GroupSales[0].HOTELNAME);*/
				 //console.log(data.GroupSales[0]);
		  
				  $.each(data.Hotels, function(){
					  var url = '#hotel_template';
					  if(this.FRCLASSIFICATIONID == 0){
						  var starsImg = 2;
						  var stars = '★★';
					  }
					  else if(this.FRCLASSIFICATIONID == 1){
						  var starsImg = 3;
						  var stars = '★★★';
					  }
					  else if(this.FRCLASSIFICATIONID == 2){
						  var starsImg = 4;
						  var stars = '★★★★';
					  }
					  else if(this.FRCLASSIFICATIONID == 3){
						  var starsImg = 5;
						  var stars = '★★★★★';
					  }
					  else if(this.FRCLASSIFICATIONID == 4){
						  var starsImg = 6;
						  var stars = '★★★★★+';
					  }
					  else{
						  var starsImg = 'noimg';
						  var stars = '';
					  }
					  if(this.REVIEW){
						  var review = '<div class="review">'+ '<span>ציון</span> ' + this.REVIEW + '</div>';
					  }else{
						  var review = '';
					  }
  
					  $('#GroupSales').append(
						  '<li id="'+ this.HOTELID +'">'
							  + '<a data-transition="slide" onClick="setHotelIDLocalStorage('+this.HOTELID+');" class="gotohotelpage" href="'+url+'" data-hotelid="'+this.HOTELID+'">'
								  + '<div class="GroupSale">'
									  + '<img class="GroupSaleImage" src="http://www.hotels.co.il/hotelsmain/hotels/hotelimages/' + this.MAINPIC + ' " />'
									  + '<div class="GroupSaleText">'
										  + '<h2>'
											  + this.HOTELNAME
										  + '</h2>'
										  + '<span class="hotel_star">'
											  + stars
										  + '</span>'
										  //+ '<img class="hotelStars" src="http://www.hotels.co.il/app/images/' + starsImg +'stars.png" />'
										  + '<div class="address">'
											  + this.ADDRESS
										  + '</div>'
										  + review
									  + '</div>'
								  + '</div>'
							  + '</a>'
						  +'</li>'
					  );
				  });
			  },
			  error: function(e) {
				 console.log(e.message);
			  }
			});
			
			$("#general_page ul").addClass( "hotelsLi" );
			
		})(jQuery);
	} //else if(Cat == 'hotels')
	
	$('.myPanel').load('includes/menu_home.html');
	
}); //$(document).on('pagebeforeshow', '#general_page', function(e, data)

function socialsharingPey(title , loc){
	//window.plugins.socialsharing.share(title, 'משהו מעניין', 'http://www.hotels.co.il/app/images/eilat.jpg', 'http://www.hotels.co.il/hotelsmain/hotels/specialdeals.cfm?loc=15');
	var link = 'http://www.hotels.co.il/hotelsmain/hotels/specialdeals.cfm?loc='+loc+'';
	window.plugins.socialsharing.share(title, 'כדאי לבדוק', null, link);
}

function setHotelIDLocalStorage(HotelID){
	//var HotelID = $(this).data("hotelid");
	localStorage.setItem("HotelID", HotelID);
	//alert(HotelID);
} //function setHotelIDLocalStorage(HotelID)

function setCatTypeLocalStorage(CatType){
	//var HotelID = $(this).data("hotelid");
	localStorage.setItem("CatType", CatType);
	//alert(HotelID);
} //function setHotelIDLocalStorage(HotelID)

//-------------------------------------------------------- Back-top --------------------------------------------------------
jQuery("#back-top").hide();

jQuery(document).scroll(function () {
	if (jQuery(this).scrollTop() > 500) {
		jQuery('#back-top').fadeIn();
	} else {
		jQuery('#back-top').fadeOut();
	}
});

jQuery('#back-top a').click(function (){
	jQuery('body,html').animate({
		scrollTop: 0
	}, 800);
	return false;
});
//------------------------------------------------------- ChangeView --------------------------------------------------------
jQuery( "#changeView" ).click(function(){
	jQuery(this).toggleClass("change_view_gallery");
	jQuery( "#GroupSales" ).toggleClass( "GroupSales-horizontal" );
}); //jQuery( "#changeView" ).click(function()
//---------------------------------------------------------------------------------------------------------------------------


/*$('a.gotohotelpage').click(function (){
		var HotelID = $(this).data("hotelid");
		alert(HotelID);
		// Store
		localStorage.setItem("HotelID", HotelID);
});*/ //$('a').click(function ()

$(document).on('pagebeforeshow', '#hotel_template', function(e, data){

	/*$('#myFilter').val("");*/
	$('#HotelR').empty();
	$('#one').empty();
	$('#tow').empty();
	$('#three').empty();
	//$('.single-item').empty();
	$('#hotel_footer').empty();
	//localStorage.clear();
	
	/*var LocID = localStorage.getItem("LocID");
	var Cat   = localStorage.getItem("Cat");*/
    
    var HotelID = localStorage.getItem("HotelID");
	//var HotelID = 281;
	console.log(HotelID);
	
	(function($){
		var url = 'http://www.hotels.co.il/json/hotels_ws.cfc?method=ListHotels&HotelID='+HotelID+'';
		  $.ajax({
			type: 'GET',
			url: url,
			async: false,
			jsonpCallback: 'CBHotels',
			contentType: "application/json",
			dataType: 'jsonp',
			fixture: false,
			success: function(data){
			   /*console.dir(data.Hotels);
			   console.log(data.Hotels);
			   console.log(data.Hotels.length);*/

				$.each(data.Hotels, function(){
					var url = 'http://www.hotels.co.il/hotelsmain/hotels/hotel_mobile_res.cfm?hotelid='+this.HOTELID+'';
					if(this.FRCLASSIFICATIONID == 0){
						var starsImg = 2;
						var stars = '★★';
					}
					else if(this.FRCLASSIFICATIONID == 1){
						var starsImg = 3;
						var stars = '★★★';
					}
					else if(this.FRCLASSIFICATIONID == 2){
						var starsImg = 4;
						var stars = '★★★★';
					}
					else if(this.FRCLASSIFICATIONID == 3){
						var starsImg = 5;
						var stars = '★★★★★';
					}
					else if(this.FRCLASSIFICATIONID == 4){
						var starsImg = 6;
						var stars = '★★★★★+';
					}
					else{
						var starsImg = '';
					}
					if(this.REVIEW){
						var review = '<div class="review">'+ '<span>ציון</span> ' + this.REVIEW + '</div>';
					}else{
						var review = '';
					}
					
				   if(this.LONGITUDE){
					   localStorage.setItem("LONGITUDE", this.LONGITUDE);
				   }
				   if(this.LATITUDE){
					   localStorage.setItem("LATITUDE", this.LATITUDE);
				   }
				   if(this.HOTELNAME){
					   localStorage.setItem("HOTELNAME", this.HOTELNAME);
				   }
				   
				   if(this.PHONE900){
						$('#hotel_footer').append(
							'<a id="phone" href="tel:'+this.PHONE900+'">'
								+ '<img src="img/phone.png" />'
							+ '</a>'
							+ '<a id="res" href="'+url+'">'
								+ '<img src="img/res.png" />'
							+ '</a>'
						 );
					}else{
						$('#hotel_footer').append(
							'<a id="res" href="'+url+'">'
								+ '<img src="img/resbig.png" />'
							+ '</a>'
						 );
					}
									
					var str = this.PICTURES;
					var temp = new Array();
					temp = str.split(",");
					//console.log(temp);
					
					var HotelGallery = [{ "image": 0 }];
					var images = '<ul id="iGallery">';
					$.each( temp, function( key, value ){
					  images += '<li><a href="http://www.hotels.co.il/hotelsmain/hotels/hotels_pics/'+value+'"><img src="http://www.hotels.co.il/hotelsmain/hotels/hotels_pics/'+value+'" /></a></li>';
					  
					  //------------------------------------------------------------------------------------------------------
						var jsonG =	[{ "image": value }];
						HotelGallery = HotelGallery.concat(jsonG);
						localStorage.setItem("HotelGallery", JSON.stringify(HotelGallery));						
					//------------------------------------------------------------------------------------------------------
					  
					}); //$.each( temp, function( key, value )
					
					images += '</ul>';
					
					localStorage.setItem("HotelGallery", JSON.stringify(HotelGallery));
					//console.log(images);
					
					$('#HotelR').append(
						'<div class="hotel_main" id="'+ this.HOTELID +'">'
							  + '<div class="hotel_main_in">'
							  	  + '<input type="hidden" value="'+ this.HOTELID +'" name="hotelID" id="hotelID" />'
								  + '<input type="hidden" value="'+ this.HOTELNAME +'" name="hotelName" id="hotelName" />'
								  + '<input type="hidden" value="'+ this.FRCLASSIFICATIONID +'" name="hotelClass" id="hotelClass" />'
								  + '<input type="hidden" value="'+ this.ADDRESS +'" name="hotelAddress" id="hotelAddress" />'
								  + '<input type="hidden" value="'+ this.MAINPIC +'" name="hotelImage" id="hotelImage" />'
								  + '<div class="hotel_main_image">'
									+ '<img class="hotel_main_image" src="http://www.hotels.co.il/hotelsmain/hotels/hotelimages/' + this.MAINPIC + ' " />'
									+ review
								  + '</div>' //hotel_main_image
								  + '<h2>'
									+ this.HOTELNAME
									+ '<span class="hotel_star">'
										+ stars
									+ '</span>'
								  + '</h2>'
								  + '<div class="address">'
										  + 'כתובת: ' + this.ADDRESS
								  + '</div>' //address
								  //---------------------- Tabs ----------------------
								  /*+ '<div data-role="tabs" id="tabs">'
									  + '<div data-role="navbar">'
										+'<ul>'
											+ '<li><a href="#one" data-ajax="false">one</a></li>'
											+ '<li><a href="#two" data-ajax="false">two</a></li>'
											+ '<li><a href="ajax-content.html" data-ajax="false">three</a></li>'
										+'</ul>'
									  + '</div>' //navbar
									  + '<div id="one">'
											+ this.SHORTHOTELDESCRIPTION
									  + '</div>' //one
									  + '<div id="two">'
											+ this.LATITUDE
									  + '</div>' //two
								  + '</div>' //tabs*/
								  //-------------------- End Tabs --------------------
							  + '</div>' //hotel_main_in
						+'</div>' //hotel_main
					); //$('#HotelR').append
					
					$('#one').append(this.SHORTHOTELDESCRIPTION);
					$('#two').append(this.LATITUDE);
					$('#three').append(images);
					//$('.single-item').append(images);	
					$('#iGallery').imageflip();		
				
				}); //$.each(data.Hotels, function()
			},
			error: function(e){
			   console.log(e.message);
			}
		});

	})(jQuery);
	
	$( "#share_hotel" ).click(function(){
		var HotelID = localStorage.getItem("HotelID");
		var HOTELNAME = localStorage.getItem("HOTELNAME");
		var link  = 'http://www.hotels.co.il/hotelsmain/hotels/hotel.cfm?hotelid='+HotelID+'';
		window.plugins.socialsharing.share(HOTELNAME, 'כדאי לבדוק', null, link);
		//alert( "Hello" );
	}); //$( "#share_hotel" ).click(function()
	
	$( "#hotel_nav" ).click(function(){
		var LATITUDE  = localStorage.getItem("LATITUDE");
		var LONGITUDE = localStorage.getItem("LONGITUDE");
		var link  = 'geo:'+LONGITUDE+','+LATITUDE+';u=35';
		location.href = link;
	}); //$( "#hotel_nav" ).click(function()
	
	$('.myPanel').load('includes/menu_hotel.html');

}); //$(document).on('pagebeforeshow', '#hotel_template', function(e, data)


$(document).on('pagebeforeshow', '#page4', function(e, data){
	$('.myPanel').load('includes/menu_home.html');
}); //$(document).on('pagebeforeshow', '#page4', function(e, data)

//$(document).on('pagebeforeshow', '#basic_map', function(e, data){

//});


$("a.holidayLink").click(function(){
	var Cat     = $(this).data("cat");
	var CatType = $(this).data("holiday");
	// Store
	localStorage.setItem("CatType", CatType);
	localStorage.setItem("Cat", Cat);
	
	//$.mobile.changePage("#holiday_page");
}); //$(".holidayLink").click(function()

$(document).on('pagebeforeshow', '#holiday_page', function(e, data){

	$('#myFilter').val("");
	$('#holidaySales').empty();
	jQuery("#back-top").hide();
	
	var CatType = localStorage.getItem("CatType");

	(function($){
		var url = 'http://www.hotels.co.il/json/JPgroupSale.cfc?method=GetGroupSales&CatType='+CatType+'';
		  $.ajax({
			type: 'GET',
			url: url,
			async: false,
			jsonpCallback: 'CBGroupSale',
			contentType: "application/json",
			dataType: 'jsonp',
			fixture: false,
			success: function(data) {
			   /*console.log(data.GroupSales);
			   console.log(data.GroupSales[0].ERROR);
			   console.dir(data.GroupSales);
			   console.log(data.GroupSales.length);
			   console.log(data.GroupSales[0]);*/
			   /*console.log(data.GroupSales[0].PICTURE);
			   console.log(data.GroupSales[0].HOTELNAME);*/
			   //console.log(data.GroupSales[0]);
			   
			   //--------------------------------------------------------------------------------------
				if (data.GroupSales[0].ERROR){
					$('#holidaySales').append('<p class="no_deals">אין דילים ברגע זה</p>');
				} //if (data.GroupSales[0].ERROR)
				else{
					$.each(data.GroupSales, function(){
					if(this.SALENIGHTS == 1){
						var NIGHTS = 'לילה אחד';
					}else{
						var NIGHTS = this.SALENIGHTS + ' לילות';
					}
					var url = 'http://www.hotels.co.il/hotelsmain/hotels/hotel-groupsale.cfm?hotelid='+ this.HOTELID +'&groupsaleid='+ this.GROUPSALEID +'';
					
					if(this.CLASS == 0){
						var starsImg = 2;
						var stars = '★★';
					}
					else if(this.CLASS == 1){
						var starsImg = 3;
						var stars = '★★★';
					}
					else if(this.CLASS == 2){
						var starsImg = 4;
						var stars = '★★★★';
					}
					else if(this.CLASS == 3){
						var starsImg = 5;
						var stars = '★★★★★';
					}
					else if(this.CLASS == 4){
						var starsImg = 6;
						var stars = '★★★★★+';
					}
					else{
						var starsImg = 'noimg';
						var stars = '';
					}
					
					$('#holidaySales').append(
						'<li id="'+ this.GROUPSALEID +'" class="'+ this.LOCATION +'">'
							+ '<a href="'+url+'">'
								+ '<div class="GroupSale">'
									+ '<h2>'
										+ this.HOTELNAME
										+ '<span class="hotel_star">' + stars + '</span>'
										//+ '<img class="hotelStars" src="http://www.hotels.co.il/app/images/' + starsImg +'stars.png" />'
									+ '</h2>'
									+ '<img class="GroupSaleImage" src="http://www.hotels.co.il/hotelsmain/hotels/hotelimages/' + this.PICTURE + ' " />'
									+ '<div class="GroupSaleText">'
										+ '<div class="GroupSaleDate">'
											+ this.SALESTARTDATE + ' - ' + this.SALEENDDATE
										+ '</div>'
										+ '<div class="GROUPSALENAME">'
											+ this.GROUPSALENAME
										+ '</div>'
									+ '</div>'
									+ '<div class="GroupSalePrice">'
											+ '<div class="SALENIGHTS">'
												+ NIGHTS
											+ '</div>'
											+ '<span class="CURRENCY">'
												+ this.CURRENCY
											+ '</span>'
											+ this.SALEPRICE + '<s>'+ this.CURRENCY + this.PRICE +'</s>'
											+ '<div class="BOARDTYPE">'
												+ this.BOARDTYPE
											+ '</div>'
										+ '</div>'
								+ '</div>'
							+ '</a>'
						+'</li>'
					);
				});				
			   //--------------------------------------------------------------------------------------
				}
			},
			error: function(e) {
			   console.log(e.message);
			}
		});
	})(jQuery);

	$("#general_page ul").removeClass( "hotelsLi" );
	
	$('.myPanel').load('includes/menu_home.html');
	
}); //$(document).on('pagebeforeshow', '#general_page', function(e, data)

$(document).on('pagebeforeshow', '#CatType_page', function(e, data){

	$('#myFilter').val("");
	$('#CatTypeSales').empty();
	jQuery("#back-top").hide();
	
	var CatType = localStorage.getItem("CatType");

	(function($){
		var url = 'http://www.hotels.co.il/json/JPgroupSale.cfc?method=GetGroupSales&CatType='+CatType+'';
		  $.ajax({
			type: 'GET',
			url: url,
			async: false,
			jsonpCallback: 'CBGroupSale',
			contentType: "application/json",
			dataType: 'jsonp',
			fixture: false,
			success: function(data) {
			   /*console.log(data.GroupSales);
			   console.log(data.GroupSales[0].ERROR);
			   console.dir(data.GroupSales);
			   console.log(data.GroupSales.length);
			   console.log(data.GroupSales[0]);*/
			   /*console.log(data.GroupSales[0].PICTURE);
			   console.log(data.GroupSales[0].HOTELNAME);*/
			   //console.log(data.GroupSales[0]);
			   
			   //--------------------------------------------------------------------------------------
				if (data.GroupSales[0].ERROR){
					$('#CatTypeSales').append('<p class="no_deals">אין דילים ברגע זה</p>');
				} //if (data.GroupSales[0].ERROR)
				else{
					$.each(data.GroupSales, function(){
					if(this.SALENIGHTS == 1){
						var NIGHTS = 'לילה אחד';
					}else{
						var NIGHTS = this.SALENIGHTS + ' לילות';
					}
					var url = 'http://www.hotels.co.il/hotelsmain/hotels/hotel-groupsale.cfm?hotelid='+ this.HOTELID +'&groupsaleid='+ this.GROUPSALEID +'';
					
					if(this.CLASS == 0){
						var starsImg = 2;
						var stars = '★★';
					}
					else if(this.CLASS == 1){
						var starsImg = 3;
						var stars = '★★★';
					}
					else if(this.CLASS == 2){
						var starsImg = 4;
						var stars = '★★★★';
					}
					else if(this.CLASS == 3){
						var starsImg = 5;
						var stars = '★★★★★';
					}
					else if(this.CLASS == 4){
						var starsImg = 6;
						var stars = '★★★★★+';
					}
					else{
						var starsImg = 'noimg';
						var stars = '';
					}
					
					$('#CatTypeSales').append(
						'<li id="'+ this.GROUPSALEID +'">'
							+ '<a href="'+url+'">'
								+ '<div class="GroupSale">'
									+ '<h2>'
										+ this.HOTELNAME
										+ '<span class="hotel_star">' + stars + '</span>'
										//+ '<img class="hotelStars" src="http://www.hotels.co.il/app/images/' + starsImg +'stars.png" />'
									+ '</h2>'
									+ '<img class="GroupSaleImage" src="http://www.hotels.co.il/hotelsmain/hotels/hotelimages/' + this.PICTURE + ' " />'
									+ '<div class="GroupSaleText">'
										+ '<div class="GroupSaleDate">'
											+ this.SALESTARTDATE + ' - ' + this.SALEENDDATE
										+ '</div>'
										+ '<div class="GROUPSALENAME">'
											+ this.GROUPSALENAME
										+ '</div>'
									+ '</div>'
									+ '<div class="GroupSalePrice">'
											+ '<div class="SALENIGHTS">'
												+ NIGHTS
											+ '</div>'
											+ '<span class="CURRENCY">'
												+ this.CURRENCY
											+ '</span>'
											+ this.SALEPRICE + '<s>'+ this.CURRENCY + this.PRICE +'</s>'
											+ '<div class="BOARDTYPE">'
												+ this.BOARDTYPE
											+ '</div>'
										+ '</div>'
								+ '</div>'
							+ '</a>'
						+'</li>'
					);
				});				
			   //--------------------------------------------------------------------------------------
				}
			},
			error: function(e) {
			   console.log(e.message);
			}
		});
	})(jQuery);

	$("#general_page ul").removeClass( "hotelsLi" );
	
	$('.myPanel').load('includes/menu_home.html');
	
}); //$(document).on('pagebeforeshow', '#general_page', function(e, data)

/*function sticky_relocate() {
	var window_top = $(window).scrollTop();
	var div_top = $('#sticky-anchor').offset().top;
	if (window_top > div_top) {
		$('#sticky').addClass('stick');
	} else {
		$('#sticky').removeClass('stick');
	}
} //function sticky_relocate()

$( document ).ready(function() {

	$(function () {
		$(window).scroll(sticky_relocate);
		sticky_relocate();
	}); //$(function ()
	
});*/ //$( document ).ready(function()