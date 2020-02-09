class Road{
	constructor(from, too){
		this.road = [from, too];
	}

	draw(ctx){
		ctx.beginPath();
		ctx.strokeStyle = "white";
		ctx.moveTo(this.road[0][0], this.road[0][1]);
		var distance_vector = [this.road[1][0]-this.road[0][0], this.road[1][1]-this.road[0][1]];
		ctx.lineTo(this.road[0][0]+0.80*distance_vector[0], this.road[0][1]+0.80*distance_vector[1]);
		ctx.stroke();
		ctx.closePath();
	}
	getRoad(){
		return this.road;
	}

}