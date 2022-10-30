import fontColorContrast from 'font-color-contrast'
import jukebox from '../js/utilities/jukebox.js'



var vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
var vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)


export default (p5) => {
    let vibHeight = vh + 75, vibrateMod = 0.25, fireworks = [], gravity = p5.createVector(0, 0.2)
    /**
     * Particle Class - Parent Component for Fireworks
     * @author Daniel Shiffman
     * @link https://youtu.be/CKeyIbT3vXI
     */
    class Particle {
      constructor(x, y, hu, firework) {
        this.pos = p5.createVector(x, y);
        this.firework = firework;
        this.lifespan = 255;
        this.hu = hu;
        this.acc = p5.createVector(0, 0);
        if (this.firework) {
          this.vel = p5.createVector(0, p5.random(-18, -12));
        } else {
          this.vel = window.p5.Vector.random2D();
          this.vel.mult(p5.random(2, 10));
        }
      }
    
      applyForce(force) {
        this.acc.add(force);
      }
    
      update() {
        if (!this.firework) {
          this.vel.mult(0.9);
          this.lifespan -= 6;
        }
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
      }
    
      done() {
        if (this.lifespan < 0) {
          return true;
        } else {
          return false;
        }
      }
    
      show() {
        p5.colorMode(p5.HSB);
        if (!this.firework) {
          p5.strokeWeight(2);
          p5.stroke(this.hu, 255, 255, this.lifespan/24);
        } else {
          p5.strokeWeight(4);
          p5.stroke(this.hu, 255, 255);
        }
    
        p5.point(this.pos.x, this.pos.y);
      }
    }
    /**
     * Firework Class - Child Component for the Fireworks
     * @author Daniel Shiffman
     * @link https://youtu.be/CKeyIbT3vXI
     */
    class Firework {
      constructor() {
        this.hu = p5.random(255);
        this.firework = new Particle(p5.random(p5.width), p5.height, this.hu, true);
        this.exploded = false;
        this.particles = [];
      }
    
      done() {
        if (this.exploded && this.particles.length === 0) {
          return true;
        } else {
          return false;
        }
      }
    
      update() {
        if (!this.exploded) {
          this.firework.applyForce(gravity);
          this.firework.update();
    
          if (this.firework.vel.y >= 0) {
            this.exploded = true;
            this.explode();
          }
        }
    
        for (let i = this.particles.length - 1; i >= 0; i--) {
          this.particles[i].applyForce(gravity);
          this.particles[i].update();
    
          if (this.particles[i].done()) {
            this.particles.splice(i, 1);
          }
        }
      }
    
      explode() {
        for (let i = 0; i < 100; i++) {
          const p = new Particle(this.firework.pos.x, this.firework.pos.y, this.hu, false);
          this.particles.push(p);
        }
      }
    
      show() {
        if (!this.exploded) {
          this.firework.show();
        }
    
        for (var i = 0; i < this.particles.length; i++) {
          this.particles[i].show();
        }
      }
    }

    const generateFireworks = () => {
      p5.push()
      p5.colorMode(p5.HSB)
      p5.stroke(255)
      p5.strokeWeight(4)
      if (p5.random(1) < 0.04) fireworks.push(new Firework())
      for (let i = fireworks.length - 1; i >= 0; i--) {
        fireworks[i].update()
        fireworks[i].show()
        if (fireworks[i].done())
          fireworks.splice(i, 1);
      }
      p5.pop()
    }
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
    let show_lights = new Array(10).fill(null).map((_, i) => {
      var rgb = new Array(3).fill(0)
      rgb[i % 3] = 255
      return new ShowLight({
        x: vw/2 + (100 * p5.random(0, (i % 8))), 
        y: vh/2 + 400 + (50 * (i % 4)), 
        pivot: { x: 600, y: 460 }, 
        angle: (i*45) % 90, 
        speed: 0.0015,
        maxAngle: 90, 
        radius: 500, 
        color: p5.color(...rgb, 12), 
        offset: i + 1,
      })
    })
    const showLights = () => {
      show_lights.forEach((show_light) => {
        show_light.move()
      })
    }
    const mainButton = () => {
      let button = p5.createButton('<i class="icon f7-icons">chevron_right</i>')
      button.class('button button-circle button-large color-secondary button-outline icon-button w-initial start-button')
      button.id('landing-button')
      // button.center('horizontal')
      button.mousePressed(() => {
        if (window.f7) {
          jukebox['home'].stop()
          window.f7.views.main.router.navigate(
            { name: 'loading', path: '/loading/'}, 
            { transition: 'f7-fade', props: { redirectName: 'main_menu', redirectUrl: '/menu/' } }
            )
        }
      })
      button.style('position', 'initial')
      let buttonContainer = p5.createDiv()
      buttonContainer.child(button)
      buttonContainer.class('w-100 display-flex flex-direction-row justify-content-center')
      buttonContainer.center()
      buttonContainer.position(0, p5.height/2+100)
    }
    const titleText = () => {
      p5.textSize(42)
      p5.textFont('Poppins', 36)
      p5.textStyle(p5.BOLD)
      p5.textAlign(p5.CENTER)
      p5.fill(fontColorContrast('#1f203c'))
      p5.text('Collective Assets', p5.width/2, p5.height/2 - 60)
    }
    const lights = () => {
      let min = vh + 75
      let max = min + 30
      p5.push()
      p5.fill(255, 255, 0, 50)
      p5.drawingContext.filter = 'blur(4rem)'
      p5.ellipseMode(p5.CENTER)
      p5.ellipse(vw/2, vibHeight, vw + 150, vh/2)
      p5.pop()
      vibHeight += vibrateMod
      if (vibHeight >= max || vibHeight <= min)
        vibrateMod *= -1
    }
    const city = () => {
      let image = p5.createImg('../assets/images/city.svg', 'city')
      image.style('position', 'initial')
      image.style('opacity', 0.875)
      let imageContainer = p5.createDiv()
      imageContainer.child(image)
      imageContainer.class('w-100 display-flex flex-direction-row justify-content-center align-items-flex-end')
      imageContainer.position(0, p5.height-151.75)
    }
    p5.setup = () => {
      p5.createCanvas(vw, vh)
      p5.background('#1f203c')
      mainButton()
      city()
    }
    p5.draw = () => {  
      p5.background('#1f203c')
      generateFireworks()
      showLights()
      titleText()
      lights()
    }

    p5.windowResized = () => {
      vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
      vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
      p5.resizeCanvas(vw, vh)
    }
}