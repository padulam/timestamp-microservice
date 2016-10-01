var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/:date',function(request,response){
	response.json(convertDate(request.params.date))
});

function checkForUnixDate(d){
	if(isNaN(+d)){
		return false;
	}
	return true;
}

function convertDate(d){
	if(checkForUnixDate(d)){
		d*=1000;
	}
	var cDate = new Date(d);
	if(isNaN(cDate)){
		return {unix: null, natural: null};
	} else{
		var unixDate = cDate.getTime()/1000;
		var natLangDate = cNatLangDate(cDate);
		return {unix:unixDate,natural: natLangDate};
	}
}

function cNatLangDate(d){
	var months = ["January", "February", "March",
				"April", "May", "June","July",
				"August","September","October",
				"November","December"];

	var month = months[d.getUTCMonth()];
	var year = d.getUTCFullYear();
	var date = d.getUTCDate();
	return month + " " + date + ", " + year;
}

app.listen(3000);