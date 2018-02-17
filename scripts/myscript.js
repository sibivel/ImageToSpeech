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
        }
    }
}).keyup(function(e) {
    if (e.keyCode in map) {
        map[e.keyCode] = false;
    }
});

