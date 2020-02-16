var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
canvas.width = document.body.clientWidth*0.95; //document.width is obsolete
canvas.height = document.body.clientHeight*0.99; //document.height is obsolete
var forMouse = document.getElementById("changeMS");
var savePathButton = document.getElementById("saveToggle");
var savePathButton2 = document.getElementById("saveToggle2");
var premadeCityButton = document.getElementById("premadeCityButton");
var pathstext = document.getElementById("path_text");

var screen_width = canvas.width;
var screen_height = canvas.height;
var start_simulat = false;
var drawPremade = false;

var mouseClickState = 0;

//draw board
var start_animator = new CustomAnimation();
start_animator.setColor("#4a56ff");
for (var i = 0; i < 5; i++) {
	start_animator.addAnimationStage(4, 10, this.radius, [[screen_width*(i/5),0], [screen_width*(i/5),screen_height]]);
	start_animator.addAnimationStage(4, 10, this.radius, [[0,screen_height*(i/5)], [screen_width,screen_height*(i/5)]]);
}

function startSimulator(){
	start_simulat = true;
	document.getElementById("start-button").style.display = "none";
}


var cities = [];
var cars = [];

var pathfinding_paths = [];

var start_city = null;
var end_city = null;
var clicked = 0;
var save_path_toggle = false;
var save_path_city_list = [];

function clearCities(){
	cities = [];
	pathfinding_paths = [];
	save_path_city_list = [];
}

function togglePathSave(){
	if(save_path_toggle){
		save_path_toggle = false;
		savePathButton.removeAttribute("style");
		pathfinding_paths = [];
		save_path_city_list = [];
		for (var i = 0; i < cities.length; i++) {
			if(cities[i].getDrawOutlineToggleState()){
				cities[i].drawOutline();
			}
		}
		end_city = null;
		start_city = null;
	} else {
		save_path_toggle = true;
		savePathButton.setAttribute("style", "background-image: linear-gradient(to left, #ffffff, red);");
		pathfinding_paths = [];
		save_path_city_list = [];
		for (var i = 0; i < cities.length; i++) {
			if(cities[i].getDrawOutlineToggleState()){
				cities[i].drawOutline();
			}
		}
		end_city = null;
		start_city = null;
	}
}

function toggleDrawPremade(){
	if(drawPremade){
		drawPremade = false;
		cities = [];
		premadeCityButton.removeAttribute("style");
		save_path_city_list = [];
		pathfinding_paths = [];
	} else {
		citybuilder = new CityBuilder(screen_width, screen_height);
		cords = citybuilder.build();
		cities = [];
		save_path_city_list = [];
		pathfinding_paths = [];
		drawPremade = true;
		console.log(cords);
		premadeCityButton.setAttribute("style", "background-image: linear-gradient(to left, #ffffff, red);");
	}
}

function mouseClick(e){
	x=e.clientX;
	y=e.clientY;
	if(mouseClickState == 0){
		city1 = new City(40,x, y, cities.length+1);
		cities.push(city1);
	} else if(mouseClickState == 1){
		for (var i = 0; i < cities.length; i++) {
			var distance_vector = [cities[i].getPosition()[0]-x, cities[i].getPosition()[1]-y];
			var distance = Math.floor(Math.sqrt(distance_vector[0]*distance_vector[0] + distance_vector[1]*distance_vector[1]));
			if (distance < cities[i].getRadius()){
				if(clicked == 0){
					//if clicked city is an already clicked city.
					if((cities[i] == start_city || cities[i] == end_city)){
						//if its not in already clicked city list.
						if(!(save_path_city_list.includes(cities[i]))){
							//if  save path is not toggeld
							if(!save_path_toggle){
								pathfinding_paths = [];
								save_path_city_list = [];
								//deactivate the not clicked city.
								if(cities[i] == start_city){
									end_city.drawOutline();
								} else {
									start_city.drawOutline();
								}
							}
							//set new start city to clicked city.
							start_city = cities[i];
							clicked++;
						}
						return;
					}
					//if start city is not the clicked city and start city has been clicked and clicked city is not end city, and its not in saved path.
					//this means its a new city that has not been clicked before.
					if(start_city != cities[i] && start_city != null && cities[i] != end_city && !(save_path_city_list.includes(cities[i]))){
						//if save path is activated, create new path and return
						if(save_path_toggle){
							start_city = end_city;
							end_city = cities[i];
							end_city.drawOutline();
							save_path_city_list.push(start_city);
							save_path_city_list.push(end_city);
							findPath();
							return;
						}
						//deactive the last active ones.
						start_city.drawOutline();
						start_city = null;
						end_city.drawOutline();
						if(!save_path_toggle){
							pathfinding_paths = [];
							save_path_city_list = [];
						}
						end_city = null;
					}
					//active first city, if none of the above was true;
					if(!(save_path_city_list.includes(cities[i]))){
						start_city = cities[i];
						start_city.drawOutline();
						clicked++;
					}
				} else {
					//if its not a already clicked city
					if(!(save_path_city_list.includes(cities[i]))){
						//clear path if save path toggle is not active.
						if(!save_path_toggle){
							pathfinding_paths = [];
						} else {
							//else save new city to saved city list
							save_path_city_list.push(start_city);
							save_path_city_list.push(end_city);
						}
						end_city = cities[i];
						end_city.drawOutline();
						clicked = 0;
						findPath();
						return;
					}
				}
			}
		}
	}
}

function changeMouseState(){
	if (mouseClickState == 0) {
		mouseClickState = 1;
		forMouse.setAttribute("style", "background-image: linear-gradient(to left, #ffffff, red);");
		savePathButton.style.display = "block";
		savePathButton2.style.display = "block";
	} else {
		mouseClickState = 0;
		forMouse.removeAttribute("style");
		savePathButton.style.display = "none";
		savePathButton2.style.display = "none";
		pathfinding_paths = [];
		save_path_city_list = [];
		for (var i = 0; i < cities.length; i++) {
			if(cities[i].getDrawOutlineToggleState()){
				cities[i].drawOutline();
			}
		}
		end_city = null;
		start_city = null;
	}
}

//mobile click fix
var optionbox = document.getElementById("options");
var optionbox_clicked = false;
optionbox.addEventListener("click", showOptionsOnClick);
optionbox.addEventListener("mouseout", showOptionsOnMouseLeave);
function showOptionsOnClick(){
	if(optionbox_clicked){
		optionbox.removeAttribute("style");
		optionbox_clicked = false;
	} else {
		optionbox.setAttribute("style", "width: 20%");
		optionbox.setAttribute("style", "left: 80%");
		optionbox_clicked = true;
	}
}
//remove moble fix for pc
function showOptionsOnMouseLeave(){
	optionbox.removeAttribute("style");
}



function setup(){
	for (var i = 0; i < 10; i++) {
		city1 = new City(40,Math.floor(Math.random() * screen_width), Math.floor(Math.random() * screen_height));
		cities.push(city1);
	}
}

function findPath(){
	if(start_city != null && end_city != null){
		var pathfinder2 = new Pathfinder(start_city, end_city, cities);
		pathfinding_path2 = pathfinder2.A_start();
		pathfinding_paths.push(pathfinding_path2.reverse());
	}
}

var grd = ctx.createRadialGradient(screen_width/2, screen_height/2, 10, screen_width/2, screen_height/2, screen_height);
grd.addColorStop(0, "#000edb");
grd.addColorStop(1, "#00098f");

var cords = [];

setInterval(async function update(){
	if(canvas.width != document.body.clientWidth*0.95 || canvas.height != document.body.clientHeight*0.99){
		canvas.width = document.body.clientWidth*0.95; //document.width is obsolete
		canvas.height = document.body.clientHeight*0.99; //document.height is obsolete

		screen_width = canvas.width;
		screen_height = canvas.height;
	}
	//draws background
		ctx.fillStyle = grd;//#1f93ff
		ctx.lineWidth = 3;
		ctx.fillRect(0, 0, screen_width, screen_height);
	if(start_simulat){

		//draw premade city.
		if(drawPremade){
			for (var i = 0; i < cords.length; i++) {
				cities.push(new City(40, cords[i][0], cords[i][1], cities.length+1));
				cords.splice(i, 1);
			}
		}

		if(!start_animator.animateCircle(ctx, 0, 0)){
			for (var i = 0; i < 5; i++) {
				ctx.beginPath();
				ctx.strokeStyle = "#4a56ff";
				ctx.lineWidth = 3;
				ctx.moveTo(screen_width*(i/5),0);
				ctx.lineTo(screen_width*(i/5),screen_height);
				ctx.stroke();
				ctx.closePath();
				ctx.beginPath();
				ctx.strokeStyle = "#4a56ff";
				ctx.lineWidth = 3;
				ctx.moveTo(0,screen_height*(i/5));
				ctx.lineTo(screen_width,screen_height*(i/5));
				ctx.stroke();
				ctx.closePath();
			}
		}
		//draw title
		ctx.font = "35px Times New Roman";
		ctx.fillStyle = "white";
		ctx.textAlign = "center";
		ctx.fillText("CITY BLUEPRINT AND PATHFINDING", screen_width/2, 50);

		//draw mode
		ctx.font = "20px Times New Roman";
		ctx.textAlign = "center";
		if(mouseClickState == 1){
			ctx.fillStyle = "red";
			ctx.fillText("PATH MODE", screen_width/2, screen_height*(1/8));
		} else {
			ctx.fillStyle = "lightgreen";
			ctx.fillText("BUILD MODE", screen_width/2, screen_height*(1/8));
		}


		if (Math.floor(Math.random() * 100) < 2.5*cities.length){
			if(cities.length > 0){
			var randomCity = cities[Math.floor(Math.random() * cities.length)];
			if(randomCity.getRoads().length > 0){
				var randomRoad = randomCity.getRoads()[Math.floor(Math.random() * randomCity.getRoads().length)].getRoad();
				var car1 = new BotCar(randomRoad[0], randomRoad[1], 5, "white");
				cars.push(car1);
				}
			}
		}


		for (var i = 0; i < cars.length; i++) {
			if(cars[i].update(ctx)){
				cars.splice(i, 1);
			}
		}


		for (var i = 0; i < cities.length; i++) {
			cities[i].check(cities);
			cities[i].draw(ctx);
		}

		//draw pathfinding path if it exsists
		pathstext.innerHTML = "Current Paths: <br> From: <br>";
		for (var j = 0; j < pathfinding_paths.length; j++) {
			for(var i =0; i < pathfinding_paths[j].length; i++){
				pathstext.innerHTML = pathstext.innerHTML + "City "+pathfinding_paths[j][i].getCityID()+"<br>";
				//ctx.beginPath();
				//ctx.strokeStyle = "red";
				//ctx.lineWidth = 3;
				//ctx.moveTo(pathfinding_paths[j][i].getPosition()[0], pathfinding_paths[j][i].getPosition()[1]);
				try {
					//ctx.lineTo(pathfinding_paths[j][i+1].getPosition()[0], pathfinding_paths[j][i+1].getPosition()[1]);
					if (Math.floor(Math.random() * 300) < 3*cities.length){
						cars.push(new BotCar([pathfinding_paths[j][i].getPosition()[0], pathfinding_paths[j][i].getPosition()[1]], [pathfinding_paths[j][i+1].getPosition()[0], pathfinding_paths[j][i+1].getPosition()[1]], 8, "red"));
					}
				}
				catch(err) {
				  //ctx.moveTo(pathfinding_paths[j][i].getPosition()[0], pathfinding_paths[j][i].getPosition()[1]);
				}
				//ctx.stroke();
				//ctx.closePath();
			}
		}
	} else {
		//draw title
		ctx.font = (screen_width/screen_height*30)+"px Times New Roman";
		ctx.fillStyle = "white";
		ctx.textAlign = "center";
		ctx.fillText("CITY BLUEPRINT AND PATHFINDING", screen_width/2, screen_height*0.35);

		//draw titleinfo
		ctx.font = (screen_width/screen_height*15)+"px Times New Roman";
		ctx.fillStyle = "white";
		ctx.textAlign = "center";
		ctx.fillText("Click anywhere on the blueprint to create a city!", screen_width/2, screen_height*0.60);
		ctx.font = (screen_width/screen_height*10)+"px Times New Roman";
		ctx.fillText("Close cities will connect and create roads.", screen_width/2, screen_height*0.65);
	}

}, 30);