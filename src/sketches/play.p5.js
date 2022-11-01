import fontColorContrast from 'font-color-contrast'

var vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
var vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

export default (p5) => {
    const table = () => {
        let table = p5.createImg("../assets/images/table.png", 'table')
        table.style('max-width', '100%')
        table.style('height', 'auto')
        let imgContainer = p5.createDiv()
        imgContainer.child(table)
        imgContainer.class('w-100 display-flex flex-direction-row justify-content-center')
        imgContainer.position(0, (p5.height/2) - 200)
    }
    const chest = () => {
        let chest = p5.createImg("../assets/images/chests/chest/chest.png", 'chest')
        chest.style('max-width', '100%')
        chest.style('height', 'auto')
        chest.style('width', '156px')
        chest.id("chest")
        let imgContainer = p5.createDiv()
        imgContainer.child(chest)
        imgContainer.class('w-100 display-flex flex-direction-row justify-content-center')
        imgContainer.position(0, (p5.height/2) - 200 + 97)
    }
    p5.setup = () => {
        p5.createCanvas(vw, vh)
        p5.background('#1f203c')
        table()
        chest()
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