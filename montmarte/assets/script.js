var video = document.querySelector('video');
var textTrack = video.textTracks[0];
var test = document.getElementById('test');
var elements = [];	//contains active (visible) cues
var cueHTML;	//html to be in DOM

//video.addEventListener("play", function() { console.log('two'); video.pause(); }, true);

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
	var counter = 0;
	var looper = true;
	cueHTML = null;
	
	do{
		var cue = this.activeCues[counter];
		if(!!cue && (!cue.poped)){
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

};

video.addEventListener("seeked", updateCues(), true);


//video.play();