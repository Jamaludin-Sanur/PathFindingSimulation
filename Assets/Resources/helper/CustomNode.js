#pragma strict



class CustomNode{

	var parent : CustomNode;
	var child =  new Array();
	var x : int;
	var y : int;
	var level : int = 0;
	
	function CustomNode(xx:int , yy:int){
		x = xx;
		y = yy;
	}
	
	function addChild(temp : CustomNode){
		temp.level += 1;
		temp.parent = this;
		child.push( temp );
	}
	
	function hasChild(temp : CustomNode){
		var index:int = -1 ;
		for(var i=0; i<child.length; i++){
			if(temp == child[i]){
				index = i;
				break;
			}
		}
		return index;
	}
	
	function hasChild(xx:int, yy:int) : boolean{
		var index:boolean = false ;
		for(var i=0; i<child.length; i++){
			var temp:CustomNode = child[i];
			if(temp.x == xx && temp.y == yy){
				index = true;
				break;
			}
		}
		return index;
	}
	
	var found = false;
	function hasGrandChild(xTarget:int, yTarget:int) : boolean{
			
		for(var i=0; i<child.length; i++){
			var temp : CustomNode = child[i];
			if(temp.x == xTarget && temp.y == yTarget ){
				found = true;
				break;
			}else{
	
				found = temp.hasGrandChild(xTarget, yTarget);
				if(found==true){break;}
				
				
			}
		}
		if(found){
			print("same node");
		}
		return found;
	}

}