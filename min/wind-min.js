function cloudPush(){var i=-(windowWidth/4),t=-50,h=windowWidth/500,d=1+h;cloudpicker=floor(random(2)),clouds.length<d&&clouds.push(new Cloud(random(i,t),random(.45*windowHeight,.625*windowHeight),round(random(10,100)),cloudpicker))}function Cloud(i,t,h,d){this.x=i,this.y=t,this.lifespan=h,this.radius=100,this.width=150,this.height=120,this.windSpeedMotion=windSpeed/2,this.windowRatioSpeed=windowWidth/100,this.windmovementX=this.windSpeedMotion/this.windowRatioSpeed,this.fadeInX=0,this.fadeOutX=windowWidth,this.display=function(){push(),imageMode(CENTER),image(cloudicons[d],this.x,this.y,this.width,this.height),pop()},this.update=function(){this.x=this.x+this.windSpeedMotion,this.x<this.fadeInX&&(this.lifespan+=.5),this.x>this.fadeOutX&&this.lifespan--},this.lifespancheck=function(){return this.lifespan<=0?!0:!1}}