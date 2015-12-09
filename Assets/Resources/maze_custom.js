#pragma strict

	var wallArray = [
		[2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
		[0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 3]
	];

function Start () {
	print(wallArray[0][0]);
	
}

function generate(){
	
	for(var ii=0; ii<10; ii++){
		for(var i=0; i<10; i++){
			if(wallArray[i][ii] == 1 ){
					var wallPrototype = Resources.Load('model/wall', GameObject);
					var wall : GameObject = Instantiate(wallPrototype);
					wall.transform.position = Vector3(i,0,ii);
			}else if(wallArray[i][ii] == 2){
					var players : GameObject[] = GameObject.FindGameObjectsWithTag("player");
					//var player : GameObject = Instantiate( Resources.Load('model/player', GameObject) );
					players[0].transform.position = Vector3(i,0,ii);					
			}else if(wallArray[i][ii] == 3){
					var goals : GameObject[] = GameObject.FindGameObjectsWithTag("goal");
					//var goal : GameObject = Instantiate( Resources.Load('model/goal', GameObject) );
					goals[0].transform.position = Vector3(i,0,ii);					
			}
		}
	}
}
		


