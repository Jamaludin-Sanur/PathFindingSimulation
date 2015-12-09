#pragma strict
	
	var iteration : int = 3;
	var horizontalPoint = new Array(1,3,5,7,9);
	var verticalPoint = new Array(1,3,5,7,9);
	var wallPoint = new Array();
	var wallArray = [
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	];

function Start () {}

function generate(){

	//initialize
	horizontalPoint = new Array(1,3,5,7,9);
	verticalPoint = new Array(1,3,5,7,9);
	wallPoint = new Array();
	wallArray = [
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	];
	
	//generate point4wall
	while(wallPoint.length != iteration){
		var xTemp = Random.Range(0, horizontalPoint.length-1);
		var yTemp = Random.Range(0, verticalPoint.length-1);
		
		if(wallPoint.length == 0){
		
				wallPoint.push(new Point(horizontalPoint[xTemp], verticalPoint[yTemp]));
		}else{
				for(var i=0; i<wallPoint.length; i++){
					var pointTemp : Point = wallPoint[i];
					if(pointTemp.x != horizontalPoint[xTemp] && pointTemp.y != verticalPoint[yTemp] ){
						wallPoint.push(new Point(horizontalPoint[xTemp], verticalPoint[yTemp]));
						break;
						
					}				
				}

		}
	}
	

	
	
	//create wall from point
	for(var ii=0; ii<wallPoint.length; ii++){
		var pointPosition : Point = wallPoint[ii];
		x_createWallHorizontal(pointPosition.x, pointPosition.y);
		x_createWallVertical(pointPosition.x, pointPosition.y);
		//x_createWallVertical(pointZ.x, pointZ.y);
	}
}

function x_createWall(x,y){

	//if coordinate is not empty
	if(wallArray[x][y] != 0){
		return;
	}

	var wallPrototype = Resources.Load('model/wall', GameObject);
	var wall : GameObject = Instantiate(wallPrototype);
	wall.transform.position = Vector3(x,0,y);
	wallArray[x][y] = 1;
}

function x_createWallHorizontal(x : int,y){
	
	var xToLeft = new Array();
	var xToRight = new Array();
	
	var xPointer : int = x-1;
	//listing left wall
	while(xPointer != -1 && wallArray[xPointer][y] != 1 ){
		xToLeft.push( xPointer );
		xPointer--;
	}

	//listing right walls
	xPointer = x+1;
	while(xPointer != 10 && wallArray[xPointer][y] != 1 ){
		xToRight.push( xPointer );
		xPointer++;
	}
	
	//create hole in left wall
	var checkHole : boolean = false;
	if(xToLeft.length != 0){
		while(checkHole==false){
			var holeLeft : int = Random.Range(0.0, xToLeft.length-1);
			
			for(var iy=0; iy<wallPoint.length; iy++){
				
				
				var pointTemp : Point = wallPoint[iy];
				if(xToLeft[holeLeft] != pointTemp.x )
				{
					
					xToLeft.RemoveAt( holeLeft );		
					checkHole = true;
					break;
				}
			}

		}	
	}
	
	//create hole in right wall
	checkHole = false;
	if(xToRight.length != 0){
		while(checkHole==false){
			var holeRight : int = Random.Range(0.0, xToRight.length-1);
			
			for(iy=0; iy<wallPoint.length; iy++){
				
				
				pointTemp = wallPoint[iy];
				if( xToRight[holeRight] != pointTemp.x )
				{
					xToRight.RemoveAt( holeRight );
					checkHole = true;
					break;
				}
			}

		}	
	}
	
	//create mid wall
	x_createWall(x,y);
	
	//create left horizontal wall
	for(var i=0; i<xToLeft.length; i++){
		x_createWall( xToLeft[i], y );
	}
	
	//create right horizontal wall
	for(i=0; i<xToRight.length; i++){
		x_createWall( xToRight[i], y );
	}
}

function x_createWallVertical(x : int,y:int){
	
	var yToDown = new Array();
	var yToUp = new Array();
	
	var yPointer : int = y-1;
	//listing left wall
	while(yPointer != -1 && wallArray[x][yPointer] != 1 ){
		yToDown.push( yPointer );
		yPointer--;
	}

	//listing right walls
	yPointer = y+1;
	while(yPointer != 10 && wallArray[x][yPointer] != 1 ){
		yToUp.push( yPointer );
		yPointer++;
	}
	
	//create hole in left wall
	var checkHole : boolean = false;
	if(yToDown.length != 0){
		while(checkHole==false){
			var holeDown : int = Random.Range(0.0, yToDown.length-1);
			
			for(var iy=0; iy<wallPoint.length; iy++){
				
				
				var pointTemp : Point = wallPoint[iy];
				if(yToDown[holeDown] != pointTemp.x )
				{
					yToDown.RemoveAt( holeDown );		
					checkHole = true;
					break;
				}
			}

		}	
	}
	
	//create hole in right wall
	checkHole = false;
	if(yToUp.length != 0){
		while(checkHole==false){
			var holeUp : int = Random.Range(0.0, yToUp.length-1);
			
			for(iy=0; iy<wallPoint.length; iy++){
				
				
				pointTemp = wallPoint[iy];
				if( yToUp[holeUp] != pointTemp.x )
				{
					yToUp.RemoveAt( holeUp );
					checkHole = true;
					break;
				}
			}

		}	
	}
	
	//create mid wall
	x_createWall(x,y);
	
	//create left horizontal wall
	for(var i=0; i<yToDown.length; i++){
		x_createWall( x, yToDown[i] );
	}
	
	//create right horizontal wall
	for(i=0; i<yToUp.length; i++){
		x_createWall( x, yToUp[i] );
	}
}

function x_createWallVerticalXXX(x : int,y:int){
	
	var yToDown = new Array();
	var yToUp = new Array();
	
	var yPointer : int;
	yPointer = y-1;
	
	//listing down wall
	while(yPointer != -1 && wallArray[x][yPointer] != 1 ){
		yToDown.push( yPointer );
		yPointer--;
	}
	
	//listing right wall
	yPointer = y+1;
	while(yPointer != 10 && wallArray[x][yPointer] != 1 ){
		yToUp.push( yPointer );
		yPointer++;
	}

	//create hole in wall
	var temp : int = Random.Range(0.0, yToDown.length-1);
	yToDown.RemoveAt( temp );
	temp = Random.Range(0.0, yToUp.length-1);
	yToUp.RemoveAt( temp );

	//create mid wall
	x_createWall(x,y);
	
	//create left horizontal wall
	for(var i=0; i<yToDown.length; i++){
		x_createWall( x, yToDown[i] );
	}
	
	//create right horizontal wall
	for(i=0; i<yToUp.length; i++){
		x_createWall( x, yToUp[i] );
	}
}

function Update () {

}

