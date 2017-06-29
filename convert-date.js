function convertDate(d){

  function checkForUnixDate(d){
    if(isNaN(+d)){
      return false;
    }
    return true;
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

  var isUnixDate = checkForUnixDate(d)
  var nDate = isUnixDate ? d * 1000 : d;
  var cDate = new Date(nDate);

  if(isNaN(cDate)){
    return {unix: null, natural: null};
  } else{
    var unixDate = isUnixDate ? d : cDate.getTime()/1000 - cDate.getTimezoneOffset() * 60;
    var natLangDate = isUnixDate ? cNatLangDate(cDate) : d;
    return {unix:unixDate,natural: natLangDate};
  }
}

module.exports = convertDate;