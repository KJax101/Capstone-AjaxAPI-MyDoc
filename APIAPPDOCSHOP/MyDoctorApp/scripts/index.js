function render(data) {
   for (var i = 0; i < data.length; i++) {
            // for (var j = 0; j < data[i].practices.length; j++) {
                // var description = info.data[i].specialties[j].description;
                renderElement(data[i].practices[0].phones[0].number, data[i].profile.first_name, data[i].profile.last_name, data[i].practices[0].visit_address.street, data[i].practices[0].visit_address.city, data[i].practices[0].visit_address.state, data[i].practices[0].visit_address.zip, data[i].practices[0].website);
                // }
                // console.log(data[i].profile.first_name+"_"+data[i].profile.last_name);
        }
        $('#loader').hide();
}
function renderElement(phoneNum, firstName, lastName, street, city, state, zip, website) {
  // Create a div use it to store the info , instead of p tags html
  var tr = $("<tr>");
  for (var i = 0; i < 5; i++) {
    var td = $("<td>");
      if (i === 0) 
        td.html(firstName);
      else if (i === 1) 
        td.html(lastName);
      else if (i === 2) 
          td.html(street + ", " + city + ", " + state + ", " + zip);
      else if (i === 3) 
        td.html(phoneNum);
      else if (i === 4) 
      if (typeof website != 'undefined'){
        td.html('<a target="_blank" href="' + website + '">' + website + '</a>');
        } 
      tr.append(td);
  }
    $("#resultsTable").append(tr);
    /* Here we added the removeClass so the background image is removed when the results are displayed. */
    $("#content").removeClass("backgroundImg");
    $("#table").show();
    console.log(tr);
  // $("resultsTable");
}
function showMenu() {
    console.log("clicked");
    $(".menu").show();
}
$(document).ready(function(){




  $.ajaxSetup({
				type: "GET",
				dataType: 'json',
						
				beforeSend: function () {
					$('#loader').show();
				},
			});
			
  let specialties=["Psychiatry",
    "Anesthesiology",
    "Family Medicine",
    "Radiology",
    "Dentistry",
    "Optometry",
    "Internal Medicine",
    "Orthopedic",
    "Chiropractic",
    "Geriatric",
    "Pediatric",
    "Other"];
  for(let i = 0; i < specialties.length; i ++) {
  $('#keyword').append(`<option value="${specialties[i]}" >${specialties[i]}</option>`);
}
                     
  $("#docsearch").submit(function(event) {
      event.preventDefault();
      $("#results").removeClass("backgroundImg");
      $('#resultsTable').empty();
        let keyword = $("#keyword").val();
        if (keyword === "Other") {
          keyword = "";
        }
        let locate = $("#location").val();
        let gender = $("#selectGender option:selected").val();
        /* changed from $.ajax to $.get in order to simplify the call to the api's */
  $.get({url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + locate + "&key=AIzaSyDzbLm0qZOGrAEaV21-HyDz7LbjaT6mxfM"})
      .done(function (mapInfo) {
      console.log(mapInfo);
      var lat = mapInfo.results[0].geometry.location.lat;
      var long = mapInfo.results[0].geometry.location.lng;
      $.get({
      url: "https://api.betterdoctor.com/2016-03-01/doctors?location="
          + lat + ","
          + long + ",25"
          +(gender ? "&gender=" + gender : '') 
          +"&limit=100&user_key=9ed302bda75f009e128bf801fad50c55"
          + "&keyword=" + keyword
          })
    .done(function (info) {
          $("#resultsTable").empty();
              console.log(info);
              if (keyword.trim()=="" && keyword.replace(" ","")==""){
                render(info.data);
              }
              else {

              var filterDoctorBySpecialty = [];
              for (var i = 0; i < info.data.length; i++) {
                    for (var j = 0; j < info.data[i].specialties.length; j++) {
                        // console.log(info.data[i].specialties[j])
                        var description = info.data[i].specialties[j].description;
                        // 		console.log(description);
                        var specialName = info.data[i].specialties[j].name;
                        if (description.includes(keyword) || specialName.includes(keyword)) {
                            // console.log(info.data[i].profile.first_name, info.data[i].profile.last_name);
                            console.log(i);
                            filterDoctorBySpecialty.push(info.data[i]);
                        }
                    }
              }
              render(filterDoctorBySpecialty);
              }
          });
          });
    });
});