# ImageToSpeech
This is a basic image to speech using javascript and Google Vision API. 
## TODO:
1. Filter out small images
2. Filter out images that don't work.

## Logic for dealing with phrasing
3. If the web search is the < 10 refer to the 1st label that is in range 89%-93% => "This is an image of a (1st Label) of (2nd Web-Term if > 0.89)"
4. If the web search is > 10, "This is an image of (1st Web-Term)"
5. If the image has > 1 faces and if the first Web-Term is > 10 read, "This is an image of (1st Web-Term) and another person".
6. If the image has > 1 faces and the first Web-Term is < 10 read, "This is an image of ()"