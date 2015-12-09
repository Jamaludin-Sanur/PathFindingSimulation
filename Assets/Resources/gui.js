#pragma strict


//maze
var maze1:recursive_division;
var maze2:maze_custom;

var toggleMaze1 : boolean = true;
var toggleMaze2 : boolean = false;

//solution
var toggleSol1 : boolean = true;
var toggleSol2 : boolean = false;

var solution1 : deep_first_search;
var solution2 : generate_n_test;

var maze = [[0,0],[0,0]];

var speed:float = 2f;

function Start () {
	maze = maze1.wallArray;
}

function Update () {

}

function OnGUI(){

	//maze
	toggleMaze1 = GUILayout.Toggle(!toggleMaze2, new GUIContent("Recursive Division"));
   	toggleMaze2 = GUILayout.Toggle(!toggleMaze1,new GUIContent("Custom maze"));
	if (GUILayout.Button ("Generate Maze")){
			if(toggleMaze1){
				resetWall();
				reset();
				maze1.generate();
				maze = maze1.wallArray;
				
			}else if(toggleMaze2){
				resetWall();
				reset();
				maze2.generate();
				maze = maze2.wallArray;
				
			}
	}
	
			
	//solution
	toggleSol1 = GUILayout.Toggle(!toggleSol2, new GUIContent("Deep First Search"));
   	toggleSol2 = GUILayout.Toggle(!toggleSol1,new GUIContent("Generate & Test"));

		if (GUILayout.Button ("Solve")){
			if(toggleSol1){
				reset();
				solution1.solve();
			}else if(toggleSol2){
				reset();
				solution2.solve();
			}
		}
	
	//reset
	if (GUILayout.Button ("Reset")){
		reset();
	}
	
	
}

function generateWall(){

}



function reset(){
	solution1.cancel();
	solution2.cancel();
	var player = GameObject.Find("start");
	player.transform.position = new Vector3(0,0,0);
	
	var goal = GameObject.Find("goal");
	goal.transform.position = new Vector3(9,0,9);
	
	var floor = GameObject.FindGameObjectsWithTag("floor");
	for(var i in floor){
		Destroy(i);
	}
}

function resetWall(){
	var wall = GameObject.FindGameObjectsWithTag("wall");
	for(var i in wall){
		Destroy(i);
	}
}

