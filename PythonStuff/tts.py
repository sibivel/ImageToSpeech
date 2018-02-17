from gtts import gTTS
#import vlc

import os

def ttsOut(mytext):
    # lang = 'en'
    myobj = gTTS(mytext, lang = 'en', slow = False)

    myobj.save('temp.mp3')
    os.system(".\mpg\mpg123 temp.mp3")
    os.remove("temp.mp3")

ttsOut('dfasdfsadfasdfsafdasdf')