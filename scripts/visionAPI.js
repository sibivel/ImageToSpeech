console.log('right before loadCLient');

var http = function(method, url, body, cb) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) { return; }
        if (xhr.status >= 400) {
            console.log('XHR failed', xhr.responseText);
            return;
        }
        cb(JSON.parse(xhr.responseText));
    };
    xhr.send(body);
};

var data = {
    'requests': [
        {
            'image': {
                'source': {
                    'imageUri': 'https://www.petmd.com/sites/default/files/petmd-cat-happy-10.jpg',
                },
            },
            'features': [
                {
                    'maxResults': 5,
                    'type': 'LABEL_DETECTION',
                },
            ],
            'imageContext': {},
        },
    ],
}


function getImageData(uri) {
    var image_data;
    data.requests[0].image.source.imageUri = uri;
    http('POST',
        'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyDaBwDtrwcTIpQf4wAHi_GaCtnBahXdLFs',
        JSON.stringify(data), function(obj) {
            console.log(obj);
            speak(parseImageData(obj));
        });
}

function parseImageData(obj) {
    str = [];
    labelAnnotations = obj["responses"][0]["labelAnnotations"];
    if (labelAnnotations){
        for (i = 0; i < labelAnnotations.length; i++){
            str.push(labelAnnotations[i].description);
        }
        return str.join(', ');
    }
    else{
        return "Image data not fetched."
    }
}