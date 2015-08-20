var video = document.querySelector('video');
var textTrack = video.textTracks[0];
var test = document.getElementById('test');

//video.addEventListener("play", function() { console.log('two'); video.pause(); }, true);
textTrack.oncuechange = function(){
	var counter = 0;
	var looper = true;
	do{
		var cue = this.activeCues[counter];
		if(!!cue && (!cue.poped)){
			cue.poped=true;
			looper=false;
			test.innerHTML = cue.startTime + '-' + cue.endTime + ': ' + cue.text + '<br />' + test.innerHTML;
			console.log(cue.text);
		}else if(!cue){
			looper=false;
		}else{
			counter++;
		}
	}while(looper);
	
};
//video.play();