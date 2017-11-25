function sendData(){
  var name = document.getElementById('name').value
  var status = document.getElementById('status').value


  //console.log('Name:'+name+' Status:'+status);
  getLocation(name,status)
}
function getLocation(name,status) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
          var value = getData(name);
          console.log(value);
          if(value.length=0){
          sendDataToServer(position,name,status,false);
        }else{
          sendDataToServer(position,name,status,true);
        }
        });
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
function getData(name) {
    var value ={};
    value.name=name;
    var xhttp = new XMLHttpRequest();
    var param = "&q="+JSON.stringify(value);
    xhttp.open("GET", "https://api.mlab.com/api/1/databases/scrum/collections/daily_scrum?apiKey=R9ztPCwZwvDdPFp4c44dkQbLSH8m9Pew"+param, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var response = JSON.parse(xhttp.responseText);
    return response;
}


function sendDataToServer(position,name,status,exists){
  var json={};
  var coords={};
  json.name=name;
  json.status=status;
  coords.lat=position.coords.latitude;
  coords.lng=position.coords.longitude;
  json.date_time= new Date();
  json.coords=coords;
  var xhttp = new XMLHttpRequest();
  if(exists){
    console.log('PUT Calling');
  xhttp.open("PUT", "https://api.mlab.com/api/1/databases/scrum/collections/daily_scrum?apiKey=R9ztPCwZwvDdPFp4c44dkQbLSH8m9Pew", true);
  }else{
    console.log('POST Calling');
  xhttp.open("POST", "https://api.mlab.com/api/1/databases/scrum/collections/daily_scrum?apiKey=R9ztPCwZwvDdPFp4c44dkQbLSH8m9Pew", false);
  }
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(json));
}
