console.log("hello");

//ctrl + space
var map = {17: false, 192 :false};

$(document).keydown(function(e) {
    if (e.keyCode in map) {
        map[e.keyCode] = true;
        if (map[17] && map[192]) {
            var srcList = $('img').map(function() {
                return this.src;
            }).get();
            console.log(srcList);
            if( srcList.length == 1){
                speak("We have " + srcList.length + " image. Press escape to quit, or press the tilda key to play the next image discussion. ");
            }
            else{
                speak("We have " + srcList.length + " images. Press escape to quit, or press the tilda key to play the next image discussion. ");
            }
            
        }
    }
}).keyup(function(e) {
    if (e.keyCode in map) {
        map[e.keyCode] = false;
    }
});

