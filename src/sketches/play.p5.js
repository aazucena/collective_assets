import fontColorContrast from 'font-color-contrast'

var vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
var vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

export default (p5) => {
    p5.setup = () => {
        p5.createCanvas(vw, vh)
        p5.background('#1f203c')
    }
    p5.draw = () => {  
        p5.background('#1f203c')
    }

    p5.windowResized = () => {
        vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
        vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
        p5.resizeCanvas(vw, vh)
    }
}