class CustomAnimation {
	//three diffent 1 = outline circle, 2 = only line, 3 = 
	constructor(){
		this.currentTime = 0;
		this.currentTimeLine = 0;
		this.animationStages = [];
		this.doneDraw = [[0,0,0]];
		this.currentStage = 0;
		this.color = "gray";
	}

	animateCircle(ctx, x, y, id){
		if(this.currentStage == this.animationStages.length){
			return false;
		}
		//draw done animations
		for (var i = 0; i < this.doneDraw.length; i++) {
			var stageID2 = this.doneDraw[i][0];
			if(stageID2 == 1){
				var radius = this.doneDraw[i][2];
				ctx.beginPath();
				ctx.arc(x, y, radius, 0, 2 * Math.PI);
				ctx.strokeStyle = this.color;
				ctx.stroke();
				ctx.closePath();
			} else if(stageID2 == 2){
				var lineDetails =  this.doneDraw[i][3];
				var radius = this.doneDraw[i][2];
				ctx.beginPath();
				ctx.moveTo(x+radius*lineDetails[0], y);
				ctx.lineTo(x, y + radius*lineDetails[1]);
				ctx.stroke();
				ctx.closePath();
			} else if(stageID2 == 3){
				var radius = this.doneDraw[i][2];

				ctx.beginPath();
				ctx.arc(x, y, radius, 0, 2 * Math.PI);
				ctx.fillStyle = this.color;
	     		ctx.fill();
	     		ctx.closePath();
	     		ctx.font = "15px Times";
				ctx.fillStyle = "black";
				ctx.textAlign = "center";
				ctx.fillText("Node "+id, x, y+5);
			} else if(stageID2 == 4){

				var lineDetails =  this.doneDraw[i][3];
				ctx.beginPath();
				ctx.strokeStyle = this.color;
				ctx.moveTo(lineDetails[0][0], lineDetails[0][1]);
				var distance_vector = [lineDetails[1][0]-lineDetails[0][0], lineDetails[1][1]-lineDetails[0][1]];
				ctx.lineTo(lineDetails[0][0]+distance_vector[0], lineDetails[0][1]+distance_vector[1]);
				ctx.stroke();
				ctx.closePath();
			}
		}
		var stageID = this.animationStages[this.currentStage][0];
		//draw animations based on animationstage
		if (stageID == 1){
			this.animationTime = this.animationStages[this.currentStage][1];
			if(this.animationTime > this.currentTime){
				this.currentTime++;

				var radius = this.animationStages[this.currentStage][2];
				ctx.beginPath();
				ctx.arc(x, y, radius, 0, ((this.currentTime/this.animationTime)*2) * Math.PI);
				ctx.strokeStyle = this.color;
				ctx.stroke();
				ctx.closePath();
				return true;
			} else {
				this.doneDraw.push(this.animationStages[this.currentStage]);
				this.currentStage++;
				this.currentTime = 0;
			}
		} else if(stageID == 2){
			this.animationTime = this.animationStages[this.currentStage][1];
			if(this.animationTime > this.currentTime){
				this.currentTime++;

				var lineDetails =  this.animationStages[this.currentStage][3];
				var radius = this.animationStages[this.currentStage][2];
				ctx.beginPath();
				ctx.moveTo(x+ (this.currentTime/this.animationTime)*radius*lineDetails[0], y);
				ctx.lineTo(x, y + (this.currentTime/this.animationTime)*radius*lineDetails[1]);
				ctx.stroke();
				ctx.closePath();

				return true;
			} else{
				this.doneDraw.push(this.animationStages[this.currentStage]);
				this.currentStage++;
				this.currentTime = 0;
			}
		} else if(stageID == 3){
			this.animationTime = this.animationStages[this.currentStage][1];
			if(this.animationTime > this.currentTime){
				this.currentTime++;

				var radius = this.animationStages[this.currentStage][2];

				ctx.beginPath();
				ctx.arc(x, y, (this.currentTime/this.animationTime)*radius, 0, 2 * Math.PI);
				ctx.fillStyle = this.color;
	     		ctx.fill();
	     		ctx.closePath();
	     		return true;
			} else{
				this.doneDraw.push(this.animationStages[this.currentStage]);
				this.currentStage++;
				this.currentTime = 0;
			}
		} else if(stageID == 4){
			this.animationTime = this.animationStages[this.currentStage][1];
			if(this.animationTime > this.currentTime){
				this.currentTime++;

				var lineDetails =  this.animationStages[this.currentStage][3];
				var radius = this.animationStages[this.currentStage][2];
				ctx.beginPath();
				ctx.strokeStyle = this.color;
				ctx.moveTo(lineDetails[0][0], lineDetails[0][1]);
				var distance_vector = [lineDetails[1][0]-lineDetails[0][0], lineDetails[1][1]-lineDetails[0][1]];
				//TODO
				ctx.lineTo(lineDetails[0][0]+distance_vector[0]*(this.currentTime/this.animationTime), lineDetails[0][1]+(this.currentTime/this.animationTime)*distance_vector[1]);
				ctx.stroke();
				ctx.closePath();

				return true;
			} else {
				this.doneDraw.push(this.animationStages[this.currentStage]);
				this.currentStage++;
				this.currentTime = 0;
			}
		}
		return true;

	}

	addAnimationStage(stageID, time, radius, linedetails){
		this.animationStages.push([stageID, time, radius, linedetails]);
	}

	setColor(color){
		this.color = color;
	}


}