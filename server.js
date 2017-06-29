var express = require('express');
var app = express();
var port = process.env.PORT||8000;
var convertDate = require('./convert-date.js');

app.use(express.static('public'));

app.get('/:date',function(request,response){
	response.json(convertDate(request.params.date))
});

module.exports = app.listen(port);