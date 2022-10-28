import fontColorContrast from 'font-color-contrast'

var vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
var vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

export default (p5) => {
    var counter = 0
    p5.setup = () => {
      p5.createCanvas(vw, vh)
      p5.background('#4558ba')
    }
    p5.draw = () => {  
      p5.background('#4558ba')
      p5.textSize(42)
      p5.textFont('Poppins', 36)
      p5.textStyle(p5.BOLD)
      p5.textAlign(p5.CENTER)
      p5.fill(255, 255, 255)
      p5.text(`Loading ${updateText()}`, p5.width/2, p5.height/2)
    }

    p5.windowResized = () => {
      vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
      vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
      p5.resizeCanvas(vw, vh)
    }
    const updateText = () => {
      counter = counter < 3.5  ? counter + 0.05 : 0 
      return new Array(p5.floor(counter)).fill('.').join(' ')
    }
}