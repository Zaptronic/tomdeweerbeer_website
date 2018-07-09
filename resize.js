function windowResized() {
	weervoorspeller = select('.weervoorspeller').size();
	resizeCanvas(weervoorspeller.width, weervoorspeller.height);
    responsiveScaleCalc();
}

window.addEventListener("orientationchange", function() {
    windowResized();
    raindrops = [];
    snowflakes = [];
    clouds = [];
    weerbeerPush();
    temperaturePush();
}, false);
