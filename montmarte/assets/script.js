var video = document.querySelector('video');
var textTrack = video.textTracks[0];
var test = document.getElementById('test');
var elements = [];	//contains active (visible) cues
var cueHTML;	//html to be in DOM

//video.addEventListener("play", function() { console.log('two'); video.pause(); }, true);

//we have a cuew change
textTrack.oncuechange = function(){
	var counter = 0;
	var looper = true;
	cueHTML = null;
	
	do{
		var cue = this.activeCues[counter];
		if(!!cue && (!cue.poped)){
			cue.poped=true;
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
	
	//find expired cues
	elements.forEach(function (item, index, array){
		if(item.endTime < video.currentTime){
			elements.splice(index, 1);
		}else{
			cueHTML+=item.text;
		}
	});

	//display
	test.innerHTML=cueHTML;
};

//video.play();