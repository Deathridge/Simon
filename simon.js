var sequence = [];
var sequenceLength = 20;
var sounds = ['https://s3.amazonaws.com/freecodecamp/simonSound1.mp3', 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3', 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3', 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'];
var soundsPlayers = [new Audio(sounds[0]), new Audio(sounds[1]), new Audio(sounds[2]), new Audio(sounds[3])];
var sadTrombone = new Audio('http://www.freesound.org/data/previews/73/73581_634166-lq.mp3');
var strict;
newGame();

var selections = [];
var count = 1;

function beginGame(){
	document.getElementById('start').onclick = beginGame;

	count = 1
	addLight(0);
}

function addLight(buttonLoc){
	soundsPlayers[sequence[buttonLoc]-1].play();
	document.getElementById(sequence[buttonLoc]).className += ' light';
	setTimeout(removeLight, 500,buttonLoc);
}

function removeLight(buttonLoc){

	var clickable = document.getElementsByClassName('clickable')
	for(var j=0;j<clickable.length;j++){
		clickable[j].onclick = sumButtons;
	}
	document.getElementById(sequence[buttonLoc]).classList.remove("light");
	if(buttonLoc+1 < count){

		setTimeout(addLight,500,buttonLoc+1);
	}
}

function sumButtons(){
	soundsPlayers[this.id-1].play();
	selections.push(this.id);
	if(selections.length == count){
		if(isSolved(sequence, count, selections) && !isWinner(sequence, selections) && count < sequence.length){
			count++;
			document.getElementById('counter').innerHTML = count;
			selections = [];
			setTimeout(addLight, 1000, 0);
		}else if(isWinner(sequence, selections)){
			window.alert("Winner!");
			newGame();
		}else {
			setTimeout(addLight,500, 0);
			
		}
	}

	for(var i=0;i<selections.length;i++){
		if(sequence[i] != selections[i] && !strict){
			sadTrombone.play();
			selections = [];
			setTimeout(addLight,2500, 0);
		}else if(sequence[i] != selections[i] && strict){
			sadTrombone.play();
			setTimeout(newGame, 2500);
		}
	}		
	 
}

function isSolved(sequence, countMax, selections){
	for(var i=0;i<countMax;i++){
		if(sequence[i] != selections[i]){
			return false;
		}
	}
	return true;
}

function isWinner(sequence, selections){
	for(var i=0;i<sequence.length;i++){
		if(sequence[i] != selections[i]){
			return false;
		}
	}
	return true;
}

function newGame(){
	document.getElementById('strict').onclick = function(){ strict = true;}
	sequence = [];
	selections = [];
	count = 1;
	strict =false;
	document.getElementById('counter').innerHTML = count;
	var sequenceMember;
	for (var i=0;i< sequenceLength;i++){
		sequenceMember = Math.ceil(Math.random() * 4);
		while(sequenceMember == sequence[sequence.length-1]){
			sequenceMember = Math.ceil(Math.random() * 4)			
		}
		sequence.push(sequenceMember);
	}
	document.getElementById('start').onclick = beginGame;
}
