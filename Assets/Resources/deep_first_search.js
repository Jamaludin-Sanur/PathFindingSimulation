#pragma strict

var root : CustomNode;
var gui : gui;

var goal : GameObject;
var player : GameObject;


var currentPos : CustomNode;
var lastPos : CustomNode;
var winNode = new Array();

var move:boolean = false;

function Start () {

}

function Update () {
	if(move){
	
		player.transform.position = Vector3.Lerp(player.transform.position, new Vector3(currentPos.x, 0, currentPos.y), gui.speed);
	}
}

function solve(){

	
	
	
	// player
	player = GameObject.Find("player");

	
	//goal
	 goal = GameObject.Find("goal");

	//position
	root = new CustomNode(player.transform.position.x, player.transform.position.z);
	currentPos = root;
	lastPos = root;
	
	//create floor
					var newFloor : GameObject = Instantiate(Resources.Load("model/floor", GameObject) );
				newFloor.transform.position = new Vector3(currentPos.x, 0 , currentPos.y);
	
	
	InvokeRepeating("step", gui.speed, gui.speed);
	
	
		
}

function step(){
		
		//check finish
		var goalX : int = goal.transform.position.x;
		var goalY : int = goal.transform.position.z;
		if(currentPos.x == goalX && currentPos.y == goalY){
			winNode.Clear();
			winNode.push(currentPos);
			finalMove();
			return;
		}
		
		//check right
		if(currentPos.x+1 != 10){
			
			if( (gui.maze[currentPos.x+1][currentPos.y] != 1) && ( currentPos.x+1!=lastPos.x || currentPos.y!=lastPos.y ) ){
				//if(root.hasGrandChild(currentPos.x+1, currentPos.y) == false){
				
						var temp3 : CustomNode = new CustomNode(currentPos.x+1, currentPos.y);
						currentPos.addChild( temp3 );				
				
				//}

			}
		}		


		
		//check up
		if(currentPos.y+1 != 10){
			
			if( (gui.maze[currentPos.x][currentPos.y+1] != 1) && ( currentPos.x!=lastPos.x || currentPos.y+1!=lastPos.y ) ){
				//if(root.hasGrandChild(currentPos.x, currentPos.y+1) == false){
					
						var temp2 : CustomNode = new CustomNode(currentPos.x, currentPos.y+1);
						currentPos.addChild( temp2 );										
					

				//}
				
				

			}
		}
		
		

		
		//check down
		if(currentPos.y-1 != -1){
		
			if( (gui.maze[currentPos.x][currentPos.y-1] != 1) && ( currentPos.x!=lastPos.x || currentPos.y-1!=lastPos.y ) ){
				//if(root.hasGrandChild(currentPos.x, currentPos.y-1) == false){
				
						var temp4 : CustomNode = new CustomNode(currentPos.x, currentPos.y-1);
						currentPos.addChild( temp4 );				
				
				//}

			}
		}
		
		//check left
		if(currentPos.x-1 != -1){
			
			if( (gui.maze[currentPos.x-1][currentPos.y] != 1) && ( currentPos.x-1!=lastPos.x || currentPos.y!=lastPos.y ) ){
				//if(root.hasGrandChild(currentPos.x-1, currentPos.y) == false){
				
						var temp1 : CustomNode = new CustomNode(currentPos.x-1, currentPos.y);
						currentPos.addChild( temp1 );				
				
				//}

			}		
		}
		
	go();
}

function go(){
	

	
	move = true;	
	
	if(currentPos.child.length != 0 ){
		var hasVisited = currentPos.hasChild(lastPos);
		if(hasVisited != -1 && hasVisited+1 < currentPos.child.length){
			lastPos = currentPos;
			currentPos = currentPos.child[hasVisited+1];
			drawStep();
		}else if(hasVisited == -1){
			lastPos = currentPos;	
			currentPos = currentPos.child[0];
			drawStep();		
		}else{
				lastPos = currentPos;
				if(currentPos.parent == null){
					finalMove();
					
					return;
				}else{
					currentPos = currentPos.parent;
					drawStep();
				}
		}
	}
	
	//mundur
	else{
		lastPos = currentPos;
		if(currentPos.parent == root){
			finalMove();
			return;
		}else{
			currentPos = currentPos.parent;
			drawStep();
		}
		
		//Invoke("drawStep", 2);
		
	}
	
	
	
	
}


function drawStep(){
		var finishFloor : GameObject[]  = GameObject.FindGameObjectsWithTag("floor");
		var floorExist : boolean = false;
		
		for(var i=0; i<finishFloor.length; i++){
			
			var floorTemp : GameObject = finishFloor[i];
			
			if( (floorTemp.transform.position.x == currentPos.x && floorTemp.transform.position.z == currentPos.y) ){
				floorExist = true;
				break;
			}
		}
		
		if(!floorExist){
			var newFloor : GameObject = Instantiate(Resources.Load("model/floor", GameObject) );
			newFloor.transform.position = new Vector3(currentPos.x, 0 , currentPos.y);
		}
	

}



var temp: CustomNode;
function finalMove(){
	CancelInvoke();
	for(var i=0; i<winNode.length; i++){
		var pointer : CustomNode = winNode[i];
		if(i==0){
			temp = pointer;
		}else{
			if(pointer.level < temp.level){
				temp = pointer;
			}
		}
	}
	
	var finishFloor : GameObject[] = GameObject.FindGameObjectsWithTag("floor");
	
	
	
	while(temp.parent != null){
		
		for(i=0; i<finishFloor.length; i++){
			var floor : GameObject = finishFloor[i];
			
			if(floor.transform.position.x == temp.x && floor.transform.position.z == temp.y){
				floor.GetComponent.<Renderer>().material.color = Color(0, 200, 0);
				print("==="+temp.x+" "+temp.y);
				break;
			}
		}
		temp = temp.parent;
		
	}
	
	move = false;
	
	
}

function cancel(){
	CancelInvoke();
	move = false;
}