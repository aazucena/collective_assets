import { Howl } from 'howler'

var tracks = {
    home: new Howl({ 
        src: ['../assets/audio/music/ost/2.wav'],
        loop: true,
        volume: 0.25,
        html5: true,
        onplayerror: (sound) =>  {
            sound.once('unlock', function() {
                sound.play()
            })
        }
    }),
    main_menu: new Howl({ 
        src: ['../assets/audio/music/ost/3.wav'],
        loop: true,
        volume: 0.25,
        onplayerror: (sound) =>  {
            sound.once('unlock', function() {
                sound.play()
            })
        }
    }),
    settings: new Howl({ 
        src: ['../assets/audio/music/ost/1.wav'],
        loop: true,
        volume: 0.25,
        onplayerror: (sound) =>  {
            sound.once('unlock', function() {
                sound.play()
            })
        }
    }),
    collections: new Howl({ 
        src: ['../assets/audio/music/ost/4.wav'],
        loop: true,
        volume: 0.25,
        onplayerror: (sound) =>  {
            sound.once('unlock', function() {
                sound.play()
            })
        }
    }),
}
export default tracks
