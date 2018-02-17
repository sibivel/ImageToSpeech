console.log("hello");

//ctrl + tilda
var map = {17: false, 192: false, 27: false, 16: false};
var readimage = false
var index = 0
var length = 0

$(document).keydown(function(e) {
    if (e.keyCode in map) {
        map[e.keyCode] = true;
        if (map[17] && map[192]) {
            readimage = true;
            var srcList = $('img').map(function() {
                return this.src;
            }).get();
            console.log(srcList);
            index = 0;
            length = srcList.length;
            if( srcList.length == 1){
                speak("We have " + srcList.length + " image. Press escape to quit, or press the left shift key to play the next image description. ");
            }
            else{
                speak("We have " + srcList.length + " images. Press escape to quit, or press the left shift key to play the next image description. ");
            }
        }
        if (map[27]){
            readimage = false;
            speak("Program Exited.");
        }
        else if (map[16] && readimage){
            ++index;
            if (index < length){
                speak("This is the description of image number " + index);
                //Google Vision code
            }
            else {
                speak("There are no more images left in this list");
                index = 0;
                length = 0;
                readimage = false;
            }
        }

    }
}).keyup(function(e) {
    if (e.keyCode in map) {
        map[e.keyCode] = false;
    }
});

