class BotCar {
	constructor(from, too, r, color){
		this.from = from;
		this.too = too;
		this.radius = r;
		this.color = color;
		this.x = null;
		this.y = null;
		this.progresss = 0.01;
	}

	draw(){
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		ctx.fillStyle = this.color;
 		ctx.fill();
 		ctx.closePath();
	}

	update(ctx){
		var distance_vector = [this.too[0]-this.from[0], this.too[1]-this.from[1]];
		this.x = this.from[0]+distance_vector[0]*this.progresss;
		this.y = this.from[1]+distance_vector[1]*this.progresss;
		this.draw(ctx);
		this.progresss += 0.01;
		if (this.progresss < 1){
			return false;
		} else {
			return true;
		}
	}
}