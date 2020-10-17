class Road{
	constructor(from, too, color){
		this.road = [from, too];
		this.color = color;
	}

	draw(ctx){
		ctx.beginPath();
		ctx.strokeStyle = this.color;
		ctx.moveTo(this.road[0][0], this.road[0][1]);
		var distance_vector = [this.road[1][0]-this.road[0][0], this.road[1][1]-this.road[0][1]];
		ctx.lineTo(this.road[0][0]+distance_vector[0], this.road[0][1]+distance_vector[1]);
		ctx.stroke();
		ctx.closePath();


		ctx.save();
		ctx.translate(this.road[0][0]+distance_vector[0]/2, this.road[0][1]+distance_vector[1]/2);
		var angle = 180+Math.atan2(distance_vector[1], distance_vector[0]) * 180 / Math.PI;
		ctx.rotate(angle*Math.PI/180);
		ctx.beginPath();
	    ctx.moveTo(0,0);
	    ctx.lineTo(0, -5);
	    ctx.lineTo(-10, 0);
	    ctx.lineTo(0, 0+5);       
	    ctx.closePath();
	    ctx.fillStyle = this.color;
	    ctx.stroke();
	    ctx.fill();
	    ctx.restore();
	}
	getRoad(){
		return this.road;
	}

}