function loadInt(){loadJSON(url,gotData,"jsonp")}function loadCity(){url=baseurl+formCity.value()+type+mode+appid+unit+lang,loadJSON(url,gotData,"jsonp")}function currentlocationtocurrentcity(o){var t="http://api.openweathermap.org/data/2.5/forecast?";geolat=o.coords.latitude,geolong=o.coords.longitude,console.log(geolat),console.log(geolong),url=t+"lat="+geolat+"&lon="+geolong+type+mode+appid+unit+lang,loadJSON(url,gotData,"jsonp"),console.log(url)}function currentlocationerror(o){console.log("error:",o),loadInt()}function gotData(o){weatherData=o,city=o.city.name,country=o.city.country,lon=o.city.coord.lon,lat=o.city.coord.lat,formCity.value(city+", "+country),o.list[0].wind.speed?windSpeed=1.2*o.list[0].wind.speed:windSpeed=1,o.list[0].rain?(amountRain=o.list[0].rain["3h"],amountRain=round(200*amountRain)):amountRain=0,o.list[0].snow?(amountSnow=o.list[0].snow["3h"],amountSnow=round(200*amountSnow)):amountSnow=0,temperature=o.list[0].main.temp,tempColor=o.list[0].main.temp,weatherType=o.list[0].weather[0].id,weatherDescription=o.list[0].weather[0].description,weatherTime=o.list[0].dt,loadTimeatlocation(lon,lat,weatherTime)}function reloadCity(){loadCity(),clouds=[]}function onPause(){clouds=[],raindrops=[],clouds=[],clearInterval(cloudPush),clearInterval(raindropPush),clearInterval(snowflakePush)}function onResume(){clouds=[],raindrops=[],clouds=[]}function loadTimeatlocation(o,t,a){var n="&key=AIzaSyBhAMl015DtFzNWm-jFGE2zqHqVMPmungg",e="https://maps.googleapis.com/maps/api/timezone/json?location="+t+","+o+"&timestamp="+a+"&key="+n;loadJSON(e,calclocaltime)}function calclocaltime(o){var t=weatherTime,a=o.rawOffset;time=new Date(1e3*(t+a)),hours=time.getHours(),hours-=3,console.log(hours)}