console.log("hello");

//ctrl: 17, tilda: 192, escape: 27, left shift: 16
var map = {17: false, 192: false, 27: false, 16: false};

//boolean for checking if image has been read
var readimage = false

//index of read image in list of images
var index = 0

//initialize length of list of images to 0
var length = 0



var srcList;
//Checks for keypresses
$(document).keydown(function(e) {
    if (e.keyCode in map) {
        map[e.keyCode] = true;
        //ctrl + tilda
        if (map[17] && map[192]) {
            readimage = true;

            //gets image urls
            srcList = $('img').map(function() {
                url = this.src;
                if(this.clientWidth > 50 && this.clientHeight > 50){
                    if(url.includes('.jpg')||url.includes('.jpeg')||url.endsWith('.png') || url.includes('.webp')){
                        return this.src;
                    }
                }
                return false;
                
            }).get();
            var temp = [];
            for(var i = 0; i < srcList.length; i++){
                if(srcList[i] != false){
                    temp.push(srcList[i]);
                }
            }
            srcList = temp;
            console.log(srcList);

            index = 0;
            length = srcList.length;

            if( length == 0){
                speak("There are no images in this page");
                index = 0;
                length = 0;
                readimage = false;
            }

            //Go through the images
            else if( srcList.length == 1){
                speak("We have " + srcList.length + " image. Press escape to quit, or press the left shift key to play the next image description. ");
            }
            else{
                speak("We have " + srcList.length + " images. Press escape to quit, or press the left shift key to play the next image description. ");
            }
        }

        //exit the program by pressing escape
        if (map[27] && readimage){
            readimage = false;
            speak("Program Exited.");
        }

        //else press left shift in order to go through the various images
        else if (map[16] && readimage){
            if (index < length){
                speak("image " + (index + 1) + " description");
                getImageData(srcList[index]);
                ++index;
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

