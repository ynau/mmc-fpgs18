//Set up the JSON
$.getJSON( "test.json", function( data ) {
	//Get Data Generic
	getDataGeneric(data);
	//Get Data Car
	getDataCar(data);
	//Get Data Cards
	getCards(data);
	//Get Components
	getComponents(data);
	//Get Events
	getEvents(data);
	//On change checkbox, update the total
	$(".pchecks").on("change",function(){
		var t = getTotalValue();
		$("#sumarlive-val").text(t.toFixed(2));
	});
});

/*
* Check if the val is a number
* @params value
* @return bool
*/
function checkIsNumber(val){
	var a = val;
	var check = false;
	if($.isNumeric(a)){
		check = true;
	}
	return check;
}

/*
* Get and print cards data
* @params obj Data
* @return null
*/
function getCards(data){
	var cards = data.items.MTG.cards;
	for(c in cards){
		var name = cards[c].split("-")[0];
		var span = $("<span>"+name+"</span><br>");
		$("#mtg-list").append(span);
	}
	return null;
}

/*
* Get components data, print the list and the checkboxes
* @params obj Data
* @return null
*/
function getComponents(data){
	var components = data.items.car.components;
	var total = 0;
	$.each( components, function( key, value ) {
		var span = $("<span></span><br>");
			$(span).text(key+" - "+value);
		$("#listcomp").append(span);

		if(value){
			var val = value.replace(/\,/g, '.');
			if(key && $.isNumeric(val)){
				var check = $("<div><label><input type='checkbox' class='pchecks' value='"+val+"'>" +key+" - "+val+"<label></div>");
				$("#checkboxes").append(check);
				total+=parseFloat(val);
			}
		}
	});
	return null;
}

/*
* Get and print generic data of John Doe
* @params obj Data
* @return null
*/
function getDataGeneric(data){
	$("#name").text(data.name);
	$("#age").text(data.age);
	$("#city").text(data.city);
	$("#phone").text(data.phone);
	return null;
}

/*
* Get and print car data
* @params obj Data
* @return null
*/
function getDataCar(data){
	var car = data.items.car;
	$("#brand").text(car.brand);
	$("#model").text(car.model);
	$("#price").text(car.price);
	return null;
}

/*
* Get all the events, match visited events and non-visited events by current date
* @params obj Data
* @return null
*/
function getEvents(data){
	var events = data.events;
	var i =0;
	var v = [];
	var nv = [];

	var current_date = new Date();

	for (i=0;i<events.length;i++){
		var event = events[i];
		var aux_event =events[i];
		for(e in event){
			date = new Date(event[e].date+" 00:00:00");
			console.log(current_date);
			console.log(date);
			if(current_date.getTime() > date.getTime()){
				v.push(aux_event);
			}else{
				nv.push(aux_event);
			}
		}
	}
	getEventsV(v);
	getEventsNV(nv);
	return null;
}

/*
* Get visited events and print them into the DOM
* @params array events
* @return null
*/
function getEventsV(events){
	$.each(events,function(key,value){
		var event = events[key];
		for(name in event){
			var span = $("<span>"+name+"</span><br>");
			$("#events-a").append(span);
		}
	});
	return null;
}
/*
* Get Non-visited Events and print them into the DOM
* @params array events
* @return null
*/
function getEventsNV(events){
	$.each(events,function(key,value){
		var event = events[key];
		for(name in event){
			var span = $("<span>"+name+"</span><br>");
			$("#events-na").append(span);
		}
	});
	return null;
}

/*
* Get the key, set it up to uppercase and show the value.
* @params array events
* @return null
*/
function getHackedKey(key){
	key = key.toUpperCase();
	var keys = data.hacked_keys[key];
	$("#key-val").text(keys)
	return null;
}



/*
* Get total value of all the components checked
* @params string div where the function will show the total.
* @return null
*/
function getTotalValue(){
	var total = 0;
	$.each($(".pchecks"),function(e){
		if($(this).is(':checked')){
			var val  =$(this)[0].value;
			total+=parseFloat(val);
		}
	});
	return total;
}

/*
* This function is launched when you click into the button id : sumar 
* @return null
*/
function getTotal(){
	var total = getTotalValue()
	$("#sumar-val").text(total.toFixed(2));
	return null;
}

