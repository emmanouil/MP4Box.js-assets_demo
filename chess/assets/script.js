var video = document.querySelector('video');
var textTrack = video.textTracks[0];
var test = document.getElementById('test');
var elements = [];	//contains active (visible) cues
var cueHTML;	//html to be in DOM

var board = ChessBoard('board', 'start');	//Chessboard

//video.addEventListener("play", function() { console.log('two'); video.pause(); }, true);

//find next string between two \n characters
function sliceText(text_in, index_in){
	var index = text_in.indexOf('\n', index_in);
	return index;
}

function updateBoard(cue){
	
	text_in = cue.text;
	
	//processing pawn placement
	var index = text_in.indexOf('\n');		//find where FEN ends
	board.position(text_in.substring(0,index));

	if(text_in.indexOf('link:')<0){
		test.innerHTML='That\'s All Folks!';
		board.position(text_in);
		return;
	}
	
	//processing game info
	var output = '<table style="width:600px;">';	//HTML-formated output
	var count = 0;	//safety net during testing
	var index1, index2 =0;	//text indexes
	var link;
	do{
		output += '<tr>';
		index1 = index2;
		count++;
		index1 = text_in.indexOf('\n', index1);
		index2 = text_in.indexOf('\n', index1+1);
		//index2 = sliceText(text_in, index1+1);
		console.log(text_in.slice(index1+1, index2));
		switch(text_in.slice(index1+1, index1+6)){
			case "next:":
				output+='<td> Next play: </td><td>'+text_in.slice(index1+7, index2) + '</td>';
				break;
			case "last:":
				output+='<td>Previous move: </td><td>'+text_in.slice(index1+7, index2) + '</td>';
				break;
			case "odds:":
				output+='<td>Outcome odds: </td><td>'+text_in.slice(index1+7, index2) + '</td>';
				break;
			case "also:":
				output+='<td>This board also appeared in: </td><td><a href="'+link+'">'+text_in.slice(index1+7, index2) + '</a></td>';
				break;				
			case "link:":
				link=text_in.slice(index1+7, index2);
				break;
		}
		output += '</tr>';
	}while(index2>0 && count <10)
	output += '</table>';
	
	var txt = cue.text.slice(index+1);	//+1 because we do not want the \n character
	test.innerHTML=output;
}

function updateCues(){

	//find expired cues
	elements.forEach(function (item, index, array){
		if(item.endTime < video.currentTime){
			//elements.splice(index, 1);
			elements[index].active=false;
		}else if(item.startTime <= video.currentTime){
			elements[index].active=true;
		}
	});

	elements.forEach(function (item, index, array){
		if(elements[index].active)cueHTML+=item.text;
	});
	
	//display
	test.innerHTML=cueHTML;

}

//we have a cue change
textTrack.oncuechange = function(){
	
	var cue = this.activeCues[0];	//we assume 1 active cue at a time
	if(!!cue)
		updateBoard(cue);
/*
	var counter = 0;
	var looper = true;
	cueHTML = null;
	
	do{
		var cue = this.activeCues[counter];
		if(!!cue && (!cue.poped)){
			updateBoard(cue);
			cue.poped=true;
			cue.active=true;
			looper=false;
			elements.push(cue);
			//test.innerHTML = 'counter: '+ counter+ ' time: '+ video.currentTime + ' ___ ' + cue.startTime + '-' + cue.endTime + ': ' + cue.text + '<br />' + test.innerHTML;
			console.log(cue.text);
		}else if(!cue){
			looper=false;
		}else{
			counter++;
		}
	}while(looper);
	
	updateCues();
*/
};

video.addEventListener("seeked", updateCues(), true);


//video.play();