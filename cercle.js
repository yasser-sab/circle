
var canvas=document.createElement('canvas');
	w=canvas.width=window.innerWidth/2;
	h=canvas.height=window.innerHeight/2;
canvas.style="border:1px solid black";
document.body.appendChild(canvas);
document.body.style=
	context=canvas.getContext("2d");

var mouse={
	x:0,
	y:0
};
window.addEventListener("mousemove",function(event){
	mouse.x=event.x;
	mouse.y=event.y;
});
var colors=[
	"#273482",
	"#420980",
	"#093902",
	"#094839",
	"#284703"
];
function Cercle(x,y,xspeed,yspeed,xacc,yacc,radius){
	this.x=x;
	this.y=y;
	this.xspeed=xspeed;
	this.yspeed=yspeed;
	this.xacc=xacc;
	this.yacc=yacc;
	this.radius=radius;
	this.color=colors[Math.floor(Math.random()*colors.length)];
	this.draw=function(){
		context.beginPath();
		context.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
		context.strokeStyle=this.color;
		context.fillStyle=this.color;
		context.fill()
		context.stroke();
	}
	this.move=function(){

		this.xspeed+=this.xacc;
		this.yspeed+=this.yacc;
		this.x+=this.xspeed;
		this.y+=this.yspeed;
		
	}
	this.edges=function(){
		if(this.x>(w-this.radius)||this.x-this.radius<0){
			this.xspeed*=-1;
		}
		if(this.y>(h-this.radius)||this.y-this.radius<0){
			this.yspeed*=-1;
		}
		
	}
}
function rand(x,y){
	return (Math.random()*y)+x;
}

var cercleArray=[];
for (var i = 0; i < 100; i++) {
	let radius=rand(1,25),
		x=rand(radius,w-radius*2),
		y=rand(radius,h-radius*2),
		xspeed=rand(-0.5,0.5),
		yspeed=rand(-0.5,0.5);
	cercleArray.push(new Cercle(x,y,xspeed,yspeed,0,0,radius));
}

function animate(){
	requestAnimationFrame(animate);
	context.clearRect(0,0,w,h);
	for (var i = 0; i < cercleArray.length; i++) {
		cercleArray[i].edges();
		cercleArray[i].move();
		cercleArray[i].draw();
	}
}
animate();
