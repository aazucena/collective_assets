
var vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
var vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)



export default (p5) => {
    let x = 320
    let y = 180
    let xspeed = 5
    let yspeed = 2
    let r = 25
    p5.setup = () => {
      p5.createCanvas(vw, vh)
    }
    p5.draw = () => {  
      p5.background(69, 88, 186)
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