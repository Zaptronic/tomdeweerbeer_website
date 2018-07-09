function setup(){weervoorspeller=select(".weervoorspeller").size(),console.log(weervoorspeller),createCanvas(weervoorspeller.width,weervoorspeller.height).parent("tomweer");for(var e=0;e<weathericonsAmount;e++)weathericon[e]=loadImage("images/tomtypes/weather"+e+".png");for(var e=0;e<4;e++)cloudicons[e]=loadImage("images/clouds/clouds"+e+".png");for(var e=0;e<2;e++)nightordayicon[e]=loadImage("images/nightorday"+e+".png");navigator.geolocation.getCurrentPosition(currentlocationtocurrentcity,currentlocationerror,{timeout:3e4}),timer1=new TimerObject(0,100,32,weervoorspeller.height-32),timer1.counterclock(),mobilesizes(),responsiveScaleCalc(),fill(255),errorpage=select(".errorpage"),setInterval(loadInt,1e9),retryButton=select(".retry"),retryButton.mousePressed(loadInt),forminit(),setInterval(raindropPush,100),setInterval(snowflakePush,400),weerbeerPush(),setInterval(weerbeerPush,5e3),nightordayPush(),starsbynightPush(),keyPressed()}function draw(){if(background(darkblue),weatherData||error(),weatherData){errorpage.hide(),nightorday.display(),timer1.counter()%10==0&&800!=weatherType&&cloudPush();for(var e=0;e<stars.length;e++)stars[e].display(),stars[e].update();for(var e=clouds.length-1;e>0;e--)clouds[e].update(),clouds[e].display(),clouds[e].lifespancheck()&&clouds.splice(e,1);weerbeer.display(),temperaturePush();for(var e=raindrops.length-1;e>0;e--)raindrops[e].update(),raindrops[e].display(),raindrops[e].lifespancheck()&&raindrops.splice(e,1);for(var e=snowflakes.length-1;e>0;e--)snowflakes[e].update(),snowflakes[e].display(),snowflakes[e].lifespancheck()&&snowflakes.splice(e,1)}}function responsiveScaleCalc(){var e=weervoorspeller.width/1e3;return windowWidth>windowHeight&&windowWidth<370&&windowHeight<700?(e=weervoorspeller.width/2e3,responsiveRatio=constrain(e,minRespL,maxRespL)):(e=weervoorspeller.height/1e3,responsiveRatio=constrain(e,minRespP,maxRespP)),responsiveRatio}function mobilesizes(){windowWidth<372&&(minRespP=.18),windowWidth>760&&(outerpadding=30,buttonSize=60)}function loadInt(){loadJSON(url,gotData,"jsonp"),console.log("a")}function loadCity(){url=baseurl+formCity.value()+type+mode+appid+unit+lang,loadJSON(url,gotData,"jsonp"),console.log("b")}function currentlocationtocurrentcity(e){geolat=e.coords.latitude,geolong=e.coords.longitude,url="http://api.openweathermap.org/data/2.5/forecast?lat="+geolat+"&lon="+geolong+type+mode+appid+unit+lang,loadJSON(url,gotData,"jsonp"),console.log("c")}function currentlocationerror(e){console.log("error:",e),loadInt()}function gotData(e){if(weatherData=e,city=e.city.name,country=e.city.country,lon=e.city.coord.lon,lat=e.city.coord.lat,formCity.value(city+", "+country),windSpeed=e.list[0].wind.speed?e.list[0].wind.speed:1,e.list[0].rain){amountRain=e.list[0].rain["3h"];var t=map(amountRain,1,25,10,100);amountRain=round(t),console.log("rain ="+amountRain)}else amountRain=0;if(e.list[0].snow){amountSnow=e.list[0].snow["3h"],amountSnow=round(2e3*amountSnow);var i=map(amountSnow,1,25,10,100);amountSnow=round(i),console.log("snow ="+amountSnow)}else amountSnow=0;temperature=e.list[0].main.temp,tempColor=e.list[0].main.temp,weatherType=e.list[0].weather[0].id,weatherDescription=e.list[0].weather[0].description,weatherTime=e.list[0].dt,loadTimeatlocation(lon,lat,weatherTime)}function clearweatherElements(){clouds=[],snowflakes=[],raindrops=[]}function reloadCity(){loadCity()}function onResume(){clouds=[],currentcloudpush=0,raindrops=[],snowflakes=[]}function loadTimeatlocation(e,t,i){var r="https://maps.googleapis.com/maps/api/timezone/json?location="+t+","+e+"&timestamp="+i+"&key="+Gkey;loadJSON(r,calclocaltime)}function calclocaltime(e){var t=weatherTime,i=e.rawOffset;time=new Date(1e3*(t+i)),hours=time.getHours(),hours-=3}function TimerObject(e,t,i,r){this.x=i,this.y=r,this.interval=t,this.display=function(){text("timer: "+e,this.x,this.y)},this.update=function(){e++},this.counterclock=function(){setInterval(this.update,this.interval)},this.counter=function(){return e;console.log("hit")}}function debug(){push(),fill(255,0,0),textSize(24),timer1.display(),pop(),push(),fill(255,0,0),textSize(64);var e=floor(frameRate());text(e,32,weervoorspeller.height-64),pop()}function weerbeerPush(){var e=weervoorspeller.width/2,t=1050,i=1050*responsiveRatio,r=ceil(weervoorspeller.height-i/2);weerbeer=new Weerbeer(e,r,i)}function Weerbeer(e,t,i){this.x=e,this.y=t,this.radius=i,this.fillColor=255,this.display=function(){imageMode(CENTER),weatherType>=200&&weatherType<300&&(push(),noStroke(),fill(this.fillColor-100),ellipse(this.x,this.y,this.radius,this.radius),pop()),weatherType>=300&&weatherType<400&&(console.log("drizzle"),push(),rectMode(CENTER),noStroke(),fill(this.fillColor,120,200),rect(this.x,this.y,this.radius,this.radius),pop()),(500==weatherType||weatherType>=515&&weatherType<522)&&image(weathericon[0],this.x,this.y,this.radius,this.radius),(weatherType>=501&&weatherType<515||weatherType>=522&&weatherType<600)&&image(weathericon[3],this.x,this.y,this.radius,this.radius),weatherType>=600&&weatherType<700&&(push(),rectMode(CENTER),noStroke(),fill(this.fillColor,255,255),rect(this.x,this.y,this.radius,this.radius),pop()),weatherType>=700&&weatherType<800&&(push(),rectMode(CENTER),noStroke(),fill(this.fillColor,255,255),rect(this.x,this.y,this.radius,this.radius),pop()),800==weatherType&&temperature>0&&(push(),image(weathericon[1],this.x,this.y,this.radius,this.radius),pop()),weatherType>=801&&weatherType<900&&(push(),image(weathericon[2],this.x,this.y,this.radius,this.radius),pop()),weatherType>=900&&(push(),rectMode(CENTER),noStroke(),fill(0,0,0),ellipse(this.x,this.y,this.radius,this.radius),pop())}}function raindropPush(){var e=-.15*windowWidth,t=windowWidth-.15*windowWidth;raindrops.length<amountRain&&raindrops.push(new Raindrop(random(e,t),random(-windowHeight/4,0),round(random(100,windowHeight/2))))}function Raindrop(e,t,i){this.x=e,this.y=t,this.radius=50,this.lifespan=i,this.windmovementX=windSpeed/10,this.windmovementY=windSpeed/2,this.raindropRotator=-HALF_PI/10,this.display=function(){push(),rotate(this.raindropRotator),noStroke(),fill(121,219,226,this.lifespan),beginShape(),curveVertex(this.x,this.y),curveVertex(this.x,this.y),curveVertex(this.x+3,this.y+3),curveVertex(this.x+5,this.y+20),curveVertex(this.x,this.y+26),curveVertex(this.x-5,this.y+20),curveVertex(this.x-3,this.y+3),curveVertex(this.x,this.y),endShape(CLOSE),pop()},this.update=function(){this.x=this.x+this.windmovementX,this.y=this.y+this.windmovementY,this.lifespan--,this.windmovementY=this.windmovementY+.01},this.lifespancheck=function(){return this.lifespan<0}}function snowflakePush(){var e=-.15*windowWidth,t=windowWidth-.15*windowWidth;snowflakes.length<amountSnow&&800!=weatherType&&snowflakes.push(new Snowflake(random(e,t),random(-windowHeight/8,0),round(random(10,windowHeight/2))))}function Snowflake(e,t,i){this.x=e,this.y=t,this.radius=random(10,25),this.lifespan=i,this.windmovementX=windSpeed/10,this.windmovementY=windSpeed/2,this.raindropRotator=-HALF_PI/10,this.display=function(){push(),rotate(this.raindropRotator),noStroke(),fill(255,this.lifespan),ellipse(this.x,this.y,this.radius,this.radius),pop()},this.update=function(){this.x=this.x+this.windmovementX,this.y=this.y+this.windmovementY,this.lifespan--,this.windmovementY=this.windmovementY+.001},this.lifespancheck=function(){return this.lifespan<0}}function cloudpushControl(){return currentcloudpush<50?currentcloudpush++:currentcloudpush=currentcloudpush,currentcloudpush<=4}function cloudPush(){var e=[-120,-240,-360],t=floor(random(e.length)),i=e[t],r=[.4*windowHeight,.5*windowHeight,.6*windowHeight],s=floor(random(r.length)),o=r[s],n=round(random(10,80)),a=windowWidth/100,h=round(a);cloudpicker=floor(random(4)),clouds.length<=h&&weatherData&&0==cloudpushControl()?second()%2==0&&random(1e3)<50&&clouds.push(new Cloud(i,o,n,cloudpicker)):clouds.length<=h&&weatherData&&1==cloudpushControl()&&clouds.push(new Cloud(i,o,n,cloudpicker))}function Cloud(e,t,i,r){this.x=e,this.y=t,this.lifespan=i,this.width=120*responsiveRatio,this.height=96*responsiveRatio,this.windSpeedMotion=map(windSpeed,0,32.7,1,6),this.windmovementX=this.windSpeedMotion,this.fadeInX=0,this.fadeOutX=windowWidth,this.display=function(){push(),imageMode(CENTER),image(cloudicons[r],this.x,this.y,this.width,this.height),pop()},this.update=function(){this.x=this.x+this.windmovementX,this.x<this.fadeInX&&(this.lifespan+=.5),this.x>this.fadeOutX&&this.lifespan--},this.lifespancheck=function(){return this.lifespan<=0}}function temperaturePush(){fill(0),temperature=floor(temperature),weeromschrijving=select(".omschrijving",".weeromschrijving"),temperatuur=select(".temperatuur",".weeromschrijving"),weeromschrijving.html(weatherDescription),temperatuur.html(temperature+"*C")}function nightordayPush(){var e=.85*weervoorspeller.width,t=.2*weervoorspeller.height,i=80;nightorday=new Nightorday(e,t,80*responsiveRatio)}function Nightorday(e,t,i){this.x=e,this.y=t,this.size=i,this.display=function(){imageMode(CENTER),(hours>=-3&&hours<6||hours>18&&hours<=23)&&image(nightordayicon[1],this.x,this.y,this.size,this.size),hours>=6&&hours<=18&&image(nightordayicon[0],this.x,this.y,this.size,this.size)}}function starsbynightPush(){for(var e=[.73,.82,.93,.225,.1],t=[.17,.3,.28,.31,.26],i=[4,8,4,6,4],r=[90,60,20,120,70],s=0;s<i.length;s++)stars.push(new Starbynight(e[s],t[s],i[s],r[s]))}function Starbynight(e,t,i,r){this.x=e,this.y=t,this.innerRadius=i*responsiveRatio,this.outerRadius=2*i,this.starbrightness=r,this.starbrightnessSpeed=1,this.display=function(){if(hours>=-3&&hours<6||hours>18&&hours<=23){noStroke();for(var e=0;e<stars.length;e++)push(),fill(234,167,0,this.starbrightness),translate(width*this.x,height*this.y),rotate(frameCount/-150),star(0,0,this.innerRadius,this.outerRadius,5),pop()}if(hours>=6&&hours<=18){var t=20,i=15,r=.54*weervoorspeller.height;noStroke(),push(),fill(255,5),translate(-20,0),beginShape(),curveVertex(-10,r),curveVertex(-10,r-15),curveVertex(.25*windowWidth,r),curveVertex(.5*windowWidth,r-15),curveVertex(.75*windowWidth,r),curveVertex(1.25*windowWidth,r-15),curveVertex(1.5*windowWidth,r-15),curveVertex(1.5*windowWidth,r+20+10.5),curveVertex(1.25*windowWidth,r+20+15),curveVertex(.75*windowWidth,r+20),curveVertex(.5*windowWidth,r+20+10.5),curveVertex(.25*windowWidth,r+20),curveVertex(-10,r+20+10.5),curveVertex(-10,r),endShape(),pop(),push(),fill(255,4),translate(-80,20),beginShape(),curveVertex(-10,r),curveVertex(-10,r-15),curveVertex(.25*windowWidth,r),curveVertex(.5*windowWidth,r-9),curveVertex(.75*windowWidth,r),curveVertex(1.25*windowWidth,r-10.5),curveVertex(1.5*windowWidth,r-15),curveVertex(1.5*windowWidth,r+10+4.5),curveVertex(1.25*windowWidth,r+10+15),curveVertex(.75*windowWidth,r+10),curveVertex(.5*windowWidth,r+10+6),curveVertex(.25*windowWidth,r+10),curveVertex(-10,r+10+3),curveVertex(-10,r),endShape(),pop()}},this.update=function(){this.starbrightness=this.starbrightness+this.starbrightnessSpeed,this.brightnesscheck()?this.starbrightnessSpeed=1*this.starbrightnessSpeed:this.starbrightnessSpeed=-1*this.starbrightnessSpeed},this.brightnesscheck=function(){return this.starbrightness>20&&this.starbrightness<150}}function star(e,t,i,r,s){var o=TWO_PI/s,n=o/2;beginShape();for(var a=0;a<TWO_PI;a+=o){var h=e+cos(a)*r,u=t+sin(a)*r;vertex(h,u),h=e+cos(a+n)*i,u=t+sin(a+n)*i,vertex(h,u)}endShape(CLOSE)}function error(){errorpage.show()}function ButtonObject(e,t){this.padding=e,this.x=2*this.padding,this.y=windowHeight-2*this.padding,this.radius=t,this.display=function(){push(),ellipseMode(CENTER),noStroke(),fill(tomred),ellipse(this.x,this.y,this.radius,this.radius),pop()},this.click=function(){return touchX<=this.padding+this.radius&&touchY>=windowHeight-(this.padding+this.radius)&&(console.log("buttonhit is true"),!0)}}function ExitButton(e,t){this.padding=e,this.x=windowWidth-2*this.padding,this.y=2*this.padding,this.radius=t,this.display=function(){push(),ellipseMode(CENTER),noStroke(),fill(tomyellow),ellipse(this.x,this.y,this.radius,this.radius),pop(),push(),strokeCap(ROUND),strokeWeight(4),stroke(255),line(this.x-.2*this.radius,this.y-.2*this.radius,this.x+.2*this.radius,this.y+.2*this.radius),line(this.x+.2*this.radius,this.y-.2*this.radius,this.x-.2*this.radius,this.y+.2*this.radius),pop()},this.exit=function(){return touchX>=windowWidth-(this.padding+this.radius)&&touchY<=this.padding+this.radius&&(console.log("exithit is true"),!0)}}function forminit(){formCity=select("#formCity"),searchform=select(".searchform"),searchpage=select(".searchpage"),searchpageBackground=select(".searchpage__background"),submitbutton=select(".submitbutton"),clearbutton=select(".clearbutton"),formCity.touchStarted(enterFormfield),clearbutton.touchStarted(clearPressed),submitbutton.touchStarted(submitPressed)}function enterFormfield(){return addsearchpage(),document.activeElement.focus(),formCity.value(null)&&clearbutton.addClass("clearbutton__hide"),!1}function clearPressed(){return formCity.value(null),addsearchpage(),clearbutton.addClass("clearbutton__hide"),!1}function keyPressed(e){if(clearweatherElements(),13===keyCode)if(checkform())reloadCity(),document.activeElement.blur(),removesearchpage();else if(!checkform())return e.preventDefault(),!1}function submitPressed(){clearweatherElements(),checkform()&&(reloadCity(),document.activeElement.blur(),removesearchpage())}function addsearchpage(){searchpagecounter<1&&(searchpage.addClass("searchpage__show"),searchpageBackground.addClass("searchpage__background__show"),searchpagecounter++,window.scrollTo(0,0)),clearbuttoncounter<1&&(clearbutton.addClass("clearbutton__hide"),clearbutton.removeClass("clearbutton__show"),clearbuttoncounter++)}function removesearchpage(){searchpagecounter=0,clearbuttoncounter=0,searchpage.addClass("searchpage__transout"),searchpage.removeClass("searchpage__show"),searchpageBackground.removeClass("searchpage__background__show"),setTimeout(removetransout,700),setTimeout(clearbuttonOut,700)}function removetransout(){searchpage.removeClass("searchpage__transout")}function clearbuttonOut(){clearbutton.removeClass("clearbutton__hide"),clearbutton.addClass("clearbutton__show")}function resetForm(e){e.myButton.disabled=!1,e.myButton.value="Submit"}function checkform(){return""==formCity.value()?(console.log("checkform false"),!1):(console.log("checkform true"),!0)}function windowResized(){weervoorspeller=select(".weervoorspeller").size(),resizeCanvas(weervoorspeller.width,weervoorspeller.height),responsiveScaleCalc()}var appid="&appid=ab756baaa116a71f8636682c58f7bb84",Gkey="&key=AIzaSyBhAMl015DtFzNWm-jFGE2zqHqVMPmungg",baseurl="http://api.openweathermap.org/data/2.5/forecast?q=",city="Amsterdam, NL",country="NL",type="&type=like",mode="JSON",lang="&lang=nl",unit="&units=metric",url=baseurl+city+type+mode+appid+unit+lang,locationData,geolat,geolong,weatherData,windSpeed,amountRain,amountSnow,tempColor,temperature,weatherType,weatherDescription,raindrops=[],snowflakes=[],clouds=[],weerbeer,weathericon=[],weathericonsAmount=4,cloudicons=[],cloudpicker,stars=[],timedata,nightorday,nightordayicon=[],weatherTime,date,hours,responsiveRatio,minRespL=.7,maxRespL=1,minRespP=.55,maxRespP=1.3,outerpadding=20,buttonSize=40,darkblue=[26,35,38],tomred=[206,79,58],tomyellow=[234,167,0],buttonF,clearbutton,formCity,searchform,searchpage,errorpage,retryButton,weeromschrijving,temperatuur,weervoorspeller,timer1,currentcloudpush=0,searchpagecounter=0,clearbuttoncounter=0;window.addEventListener("orientationchange",function(){windowResized(),raindrops=[],snowflakes=[],clouds=[],weerbeerPush(),temperaturePush()},!1);