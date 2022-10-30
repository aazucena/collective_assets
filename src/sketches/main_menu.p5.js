import fontColorContrast from 'font-color-contrast'
import { random } from 'lodash'

var vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
var vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

export default (p5) => {
  var bgImage
  class ShowLight {
    constructor(props) {
      this.x = props.x 
      this.y = props.y 
      this.pivot = props.pivot
      this.angle = p5.radians(props.angle)
      this.offset = props.offset ?? 1
      this.speed = (props.speed * p5.random(0, this.offset)) < 0.25 ? (props.speed * p5.random(0, this.offset)) : (props.speed * p5.random(0, this.offset)) * 0.1 
      this.radius = props.radius
      this.maxAngle = p5.radians(props.maxAngle ?? 180)
      this.color = props.color ?? p5.color(255, 0, 0, 100)
    }
    move = () => {
      p5.push()
      p5.translate(this.x, this.y)
      p5.rotate(this.angle)
      p5.translate(-1 * this.pivot.x, -1 * this.pivot.y)
      p5.fill(this.color)
      p5.noStroke()
      p5.drawingContext.filter = 'blur(1rem)'
      p5.ellipseMode(p5.CENTER)
      p5.ellipse(0, 0, this.radius, this.radius)
      p5.pop()
      this.angle += this.speed
      if (this.angle >= this.maxAngle || this.angle <= 0)
        this.speed *=  -1
    }    
  }
  let show_lights = new Array(25).fill(null).map((_, i) => {
    var rgb = new Array(3).fill(p5.random(0, 255))
    rgb[i % 3] = 255
    return new ShowLight({
      x: vw/2 + (100 * p5.random(0, (i % 8))), 
      y: vh/2 + 400 + (50 * (i % 4)), 
      pivot: { x: 600, y: 460 }, 
      angle: (i*45) % 90, 
      speed: 0.0015,
      maxAngle: 90, 
      radius: random(100, 500), 
      color: p5.color(...rgb, 25), 
      offset: i + 1,
    })
  })
  const showLights = () => {
    show_lights.forEach((show_light) => {
      show_light.move()
    })
  }
    const pokerTable = () => {
      let poker_table = p5.createImg("../assets/images/poker-table.png")
      poker_table.style('max-width', '100%')
      poker_table.style('height', 'auto')
      let imgContainer = p5.createDiv()
      imgContainer.child(poker_table)
      imgContainer.class('w-100 display-flex flex-direction-row justify-content-center')
      imgContainer.center()
      imgContainer.position(0, (p5.height/2))
    }
    p5.preload = () => {
      bgImage = p5.loadImage("../assets/images/casino.jpg")
      bgImage.filter(p5.BLUR, 4)
    }
    p5.setup = () => {
      p5.createCanvas(vw, vh)
      p5.background('#000')
      pokerTable()
    }
    p5.draw = () => {  
      p5.background(bgImage)
      showLights()
    }

    p5.windowResized = () => {
      vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
      vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
      p5.resizeCanvas(vw, vh)
    }
}