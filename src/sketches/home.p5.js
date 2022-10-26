import fontColorContrast from 'font-color-contrast'

var vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
var vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)



export default (p5) => {
    let x = 320
    let y = 180
    let xspeed = 5
    let yspeed = 2
    let r = 25
    let button, buttonContainer
    p5.setup = () => {
      p5.createCanvas(vw, vh)
      button = p5.createButton('<i class="icon f7-icons color-yellow">bitcoin</i>')
      button.class('button button-circle button-large button-outline icon-button w-intial')
      button.center('horizontal')
      buttonContainer = p5.createDiv()
      buttonContainer.child(button)
      buttonContainer.class('w-100')
      buttonContainer.center()
      buttonContainer.position(0, p5.height/2+100)
    }
    p5.draw = () => {  
      p5.background('#1f203c')
      p5.textSize(42)
      p5.textFont('Poppins', 36)
      p5.textStyle(p5.BOLD)
      p5.textAlign(p5.CENTER)
      p5.fill(fontColorContrast('#1f203c'))
      p5.text('Collective Assets', p5.width/2, p5.height/2 - 60)
      p5.ellipse(x, y, r*2, r*2)
      x += xspeed
      y += yspeed
      if (x > p5.width - r || x < r) {
        xspeed = -xspeed
      }
      if (y > p5.height - r || y < r) {
        yspeed = -yspeed
      }
    }
    p5.windowResized = () => {
      vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
      vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
      p5.resizeCanvas(vw, vh)
    }
}