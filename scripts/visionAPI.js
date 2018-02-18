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
                    'type': 'LABEL_DETECTION',
                    'maxResults': 5,
                },
                {
                    'type': 'FACE_DETECTION',
                    'maxResults': 5,
                },
                {
                    'type': 'WEB_DETECTION',
                    'maxResults': 5,
                },
            ],
            'imageContext': {},
        },
    ],
};

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

    var str = [];
    var labelAnnotations = obj['responses'][0]['labelAnnotations'];
    var webTerms = obj['responses'][0]['webDetection']['bestGuessLabels'][0];

    if (labelAnnotations != undefined) {
        var faceTerms = obj['responses'][0]['faceAnnotations'];
        var webTerm = webTerms.label.toLowerCase();


        for (i = 0; i < labelAnnotations.length; i++) {
            var label = labelAnnotations[i].description.toLowerCase();
            if (labelAnnotations[i].score >= 0.89) {
                if (webTerm.includes(label) || label.includes(webTerm)) {
                    continue;
                }
                str.push('this is an image of ' + webTerms.label + ' with ' +
                    labelAnnotations[i].description);
                break;
            }else {
                str.push('this is an image of ' + webTerm);
                break;

            }
        }

        return str.join(', ');
    }else {
        return "sorry, no description is available";
    }

}



