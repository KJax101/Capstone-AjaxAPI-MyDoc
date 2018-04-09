
// $.ajax({
// method is post or get
// method: "POST",
// url is the address that we are sending the request = the api address endpoint&user_key
// url: "some.php",
// data: { name: "John", location: "Boston" } 
// .done is a promise that runs after the ajax request is completed. It takes a callback function as a parameter. The argument to the callback function is the data that gets sent back to us from the API.
// .done(function( msg ) {
//  alert( "Data Saved: " + msg );
//   });
// AIzaSyDzbLm0qZOGrAEaV21-HyDz7LbjaT6mxfM

// docsearch is the form id and we are creating a callback submit function that performs the following tasks below 
$("#docsearch").submit(function(event) {
  event.preventDefault();
  let locate = $("#location").val();
  $.ajax({
  method: "GET",
  url: "https://maps.googleapis.com/maps/api/geocode/json?address="+locate+"&key=AIzaSyDzbLm0qZOGrAEaV21-HyDz7LbjaT6mxfM"
    }).done(function(data) {
      console.log(data);
      var lat = data.results[0].geometry.location.lat;
      var long = data.results[0].geometry.location.lng;
      $.ajax({
      method: "GET",
      url: "https://api.betterdoctor.com/2016-03-01/doctors?location="+lat+","+long+",25&skip=2&limit=10&user_key=9ed302bda75f009e128bf801fad50c55"
      }).done(function(data) {
      console.log(data);
  });
});
});


// navigator.geolocation.getCurrentPosition(function(position) {
//   console.log(position.coords.latitude, position.coords.longitude);
// });

// let data={gender:"female",
// query:"Diabetes"};

// function getDataFromApi(data) {
  
//   data.user_key="9ed302bda75f009e128bf801fad50c55";
  
//   let callback=function(result) { console.log(result); };
  
//   navigator.geolocation.getCurrentPosition(function(position) {
//   	data.location=`${position.coords.latitude}, ${position.coords.longitude}`;
    
//     $.getJSON("https://api.betterdoctor.com/2016-03-01/doctors", data, callback);
// 	});

// }



// // handles the submit field - sets up the evenhandler which will mak ethe API call
// function watchSubmit() {
//   $('#searchDiv > form').submit(event => {
//     event.preventDefault();
//     const queryTarget = $("#searchBox");
//     const query = queryTarget.val();
//     const data={query: query};
//     // clear out the input
//     queryTarget.val("");
//     getDataFromApi(data);
//   });
// }

// $(watchSubmit);