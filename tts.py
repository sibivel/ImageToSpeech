from gtts import gTTS
#import vlc

import os

def ttsOut(mytext):
    # lang = 'en'
    myobj = gTTS(mytext, lang = 'en', slow = False)

    file = TemporaryFile()
    
    myobj.save('welcome.mp3')
    os.system('cvlc --play-and-exit ' + "welcome.mp3")

ttsOut('Test audio 1 2 3 4 5')