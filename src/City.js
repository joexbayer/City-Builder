class City {
	constructor(r, x, y, id){
		this.radius = r;
		this.x_position = x;
		this.y_position = y;
		this.roads = [];
		this.detection_radius = 250;
		this.animator = new CustomAnimation();
		this.knownCities = [];
		this.animator.setColor("white");
		this.color = "white";
		// (stageID, animationTime, radius, lineDetails.)
		this.animator.addAnimationStage(1, 10, this.radius/4);
		this.animator.addAnimationStage(1, 10, this.radius/2);
		this.animator.addAnimationStage(1, 10, this.radius);
		this.animator.addAnimationStage(2, 5, this.radius, [0,-1]);
		this.animator.addAnimationStage(2, 5, this.radius, [0,1]);
		this.animator.addAnimationStage(2, 5, this.radius, [1,0]);
		this.animator.addAnimationStage(2, 5, this.radius, [-1,0]);
		this.animator.addAnimationStage(3, 20, this.radius);
		this.drawOutlineToggle = false;
		this.cityID = id;
	}

	getCityID(){
		return this.cityID;
	}

	getKnownCities(){
		return this.knownCities;
	}
	getDrawOutlineToggleState(){
		return this.drawOutlineToggle;
	}
	drawOutline(){
		if(this.drawOutlineToggle){
			this.drawOutlineToggle = false;
		} else {
			this.drawOutlineToggle = true;
		}
	}

	getRoads(){
		return this.roads;
	}

	getPosition(){
		return [this.x_position, this.y_position];
	}
	getRadius(){
		return this.radius;
	}

	setRoad(from, too){
		var road1 = new Road(from, too);
		this.roads.push(road1);
		if(this.roads.length > 0){
			this.radius = this.radius + 0.1*this.roads.length;
		}
		this.animator.addAnimationStage(3, 1, this.radius);
	}

	draw(ctx){
		if(!this.animator.animateCircle(ctx, this.x_position, this.y_position, this.cityID)){
			//draw roads

			if(this.drawOutlineToggle){
				ctx.beginPath();
				ctx.strokeStyle = "red";
				ctx.fillStyle = "red";
				ctx.arc(this.x_position, this.y_position, this.radius+5, 0, 2 * Math.PI);
				ctx.fill();
				ctx.closePath();
			}

			for (var i = 0; i < this.roads.length; i++) {
				this.roads[i].draw(ctx);
			}
			//draw city
			ctx.beginPath();
			ctx.arc(this.x_position, this.y_position, this.radius, 0, 2 * Math.PI);
			ctx.strokeStyle = this.color;
			ctx.fillStyle = this.color;
     		ctx.fill();
			ctx.stroke();
			ctx.beginPath();
			ctx.font = "15px Times";
			ctx.fillStyle = "black";
			ctx.textAlign = "center";
			ctx.fillText("City "+this.cityID, this.x_position, this.y_position+5);
		} 
	}
	check(cities){
		for (var i = 0; i < cities.length; i++) {
			var isFound = false;
			if(this.knownCities.includes(cities[i])){
				isFound = true;
			}
			if (this != cities[i] && !isFound){
				var distance_vector = [this.x_position-cities[i].getPosition()[0], this.y_position-cities[i].getPosition()[1]];
				var distance = Math.floor(Math.sqrt(distance_vector[0]*distance_vector[0] + distance_vector[1]*distance_vector[1]));
				if(distance < this.detection_radius){
						this.knownCities.push(cities[i]);
						this.setRoad([this.x_position,this.y_position], [cities[i].getPosition()[0], cities[i].getPosition()[1]]);
						this.animator.addAnimationStage(4, 10, this.radius, [[this.x_position,this.y_position], [cities[i].getPosition()[0], cities[i].getPosition()[1]]]);
				}
			}

		}
	}
}