class CityBuilder {
	constructor(screen_width, screen_height){
		this.total_cities = 20;
		this.screen_height = screen_height;
		this.screen_width = screen_width;
		this.max = 195;
		this.min = 90;
		this.cities = 0;
		this.next_x = Math.floor(Math.random() * (screen_width-screen_width*0.5));
		this.next_y = Math.floor(Math.random() * (screen_height-screen_height*0.5));

		this.cords = [[this.next_x, this.next_y]];
	}

	build(){
		while(this.cities < this.total_cities){
			var temp = this.getNewCords(this.next_x, this.next_y);
			this.next_x = temp[0];
			this.next_y = temp[1];
			this.cords.push([this.next_x, this.next_y]);
			this.cities++;
		}
		return this.cords;
	}

	getNewCords(current_x, current_y){
		var temp_x = -1;
		var temp_y = -1;
		var cityCheck = false;
		var failSafe = 0;
		while((temp_x<(0+80) || temp_x>screen_width-80) || (temp_y<(0+80) || temp_y>screen_height-80) || (cityCheck)){
			failSafe++;
			if(failSafe > 250){
				location.reload();
			}
			var cityCheck = false;
			var new_x = Math.floor(Math.random() * (this.max-this.min +1))+this.min;
			var new_y = Math.floor(Math.random() * (this.max-this.min +1))+this.min;
			var mod1 = Math.floor(Math.random()*2);
			var mod2 = Math.floor(Math.random()*2);
			if(mod1 == 1){
				new_x = -new_x;
			}
			if(mod2 == 1){
				new_y = -new_y;
			}
			temp_x = current_x + new_x;
			temp_y = current_y + new_y;
			for (var i = 0; i < this.cords.length; i++) {
				var distance_vector = [this.cords[i][0]-temp_x, this.cords[i][1]-temp_y];
				var distance = Math.floor(Math.sqrt(distance_vector[0]*distance_vector[0] + distance_vector[1]*distance_vector[1]));
				if(distance < this.min){
					cityCheck = true;
				}
			}
		}



		return [temp_x, temp_y];
	}
}