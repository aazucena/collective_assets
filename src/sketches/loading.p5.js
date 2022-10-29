import fontColorContrast from 'font-color-contrast'



var vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
var vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

export default (p5) => {
    var counter = 0
    var gif
    p5.preload = () => {
      gif = p5.createImg("../assets/images/coin-spin-small.gif")
    }
    const gifImage = () => {
      gif.style('max-width', '100%')
      gif.style('height', 'auto')
      gif.size(75, 75)
      let gifContainer = p5.createDiv()
      gifContainer.child(gif)
      gifContainer.class('w-100 display-flex flex-direction-row justify-content-center')
      gifContainer.center()
      gifContainer.position(0, (p5.height/2)-125)
    }
    const loadingTitle = () => {
      p5.push()
      p5.textSize(42)
      p5.textFont('Poppins', 36)
      p5.textStyle(p5.BOLD)
      p5.textAlign(p5.CENTER)
      p5.fill(255, 255, 255)
      p5.text(`Loading ${updateText()}`, p5.width/2, (p5.height/2)+25)
      p5.pop()
    }
    const loadingTips = () => {
      p5.push()
      p5.textFont('Poppins', 12)
      p5.textAlign(p5.CENTER)
      p5.fill(255, 255, 255)
      p5.text(`Play as long as you like ;)`, p5.width/2, (p5.height)-50)
      p5.pop()
    }
    p5.setup = () => {
      p5.createCanvas(vw, vh)
      p5.background('#4558ba')
      gifImage()
    }
    p5.draw = () => {  
      p5.background('#4558ba')
      loadingTitle()
      loadingTips()
    }

    p5.windowResized = () => {
      vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
      vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
      p5.resizeCanvas(vw, vh)
    }
    const updateText = () => {
      counter = counter < 3.5  ? counter + 0.00875 : 0 
      return new Array(p5.floor(counter)).fill('.').join(' ')
    }
}