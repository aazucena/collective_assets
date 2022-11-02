import fontColorContrast from 'font-color-contrast'
import jukebox from '../js/utilities/jukebox.js'

var vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
var vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

export default (p5) => {
    var store = window.f7.store
    var result = store.getters.result
    var money = store.getters.money
    let imgContainer, chestImg
    const table = () => {
        let table = p5.createImg("../assets/images/table.png", 'table')
        table.style('max-width', '100%')
        table.style('height', 'auto')
        let tableContainer = p5.createDiv()
        tableContainer.child(table)
        tableContainer.class('w-100 display-flex flex-direction-row justify-content-center')
        tableContainer.position(0, (p5.height/2) - 266)
    }
    const chest = () => {
        if (money.value >= 10) {
            let button = p5.createButton('OPEN')
            button.class('button button-circle button-large color-secondary button-outline icon-button w-initial start-button')
            button.id('play-button')
            button.style('position', 'initial')
            button.mousePressed(() => {
                store.dispatch('roll')
                if (window.f7) {
                    var item = result.value
                    chestImg.attribute('src', `../assets/images/chests/${item.data.rarity.name}-chest/${item.data.rarity.name}-chest.gif`)
                    var timer = setTimeout(() => {
                        jukebox['collections'].stop()
                        window.f7.views.main.router.navigate(
                            { name: 'result', path: '/result/'}, 
                            { props: { item: item } }
                        )
                        clearTimeout(timer)
                    }, 2000)
                }
            })
            let buttonContainer = p5.createDiv()
            buttonContainer.child(button)
            buttonContainer.class('w-100 display-flex flex-direction-row justify-content-center')
            buttonContainer.center()
            buttonContainer.position(0, (p5.height/2) + 175)
        } else {
            let warning = p5.createDiv('You do not have enough money to play')
            warning.class('w-100 display-flex flex-direction-row justify-content-center')
            warning.style('font-size', '1.755rem')
            warning.style('text-align', 'center')
            warning.style('font-weight', 'bold')
            warning.style('color', '#ffff33')
            warning.center()
            warning.position(0, (p5.height/2) + 125)
        }

        chestImg = p5.createImg("../assets/images/chests/chest/chest.png", 'chest')
        chestImg.style('max-width', '100%')
        chestImg.style('width', '156px')
        chestImg.style('height', '156px')
        chestImg.id("chest")
        imgContainer = p5.createDiv()
        imgContainer.child(chestImg)
        imgContainer.class('w-100 display-flex flex-direction-row justify-content-center')
        imgContainer.position(0, (p5.height/2) - 266 + 344 - 114)
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