import fontColorContrast from 'font-color-contrast'
import jukebox from '../js/utilities/jukebox.js'

var vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
var vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

export default (p5) => {
    var store = window.f7.store
    var result = store.getters.result
    var item = result.value
    store.dispatch('pay')

    const showLight = () => {
        p5.push()
        let rgb = p5.color(item.data.rarity.color)
        rgb.setAlpha(50)
        p5.fill(rgb)
        p5.drawingContext.filter = 'blur(4rem)'
        p5.ellipseMode(p5.CENTER)
        p5.ellipse(vw/2, vh/2, vw * 1.75, vw*1.25)
        p5.pop()
    }

    const buttonPrompts = () => {

        let tryAgainButton = p5.createButton('Try Again')
        tryAgainButton.class("button button-raised button-round button-fill button-large")
        tryAgainButton.style("margin-top", "1rem")
        tryAgainButton.style("margin-bottom", "1rem")
        tryAgainButton.style("margin-left", "0.5rem")
        tryAgainButton.style("margin-right", "0.5rem")
        tryAgainButton.style("width", "75%")
        tryAgainButton.mousePressed(() => {
            store.dispatch('empty')
            window.f7.views.main.router.navigate(
                { name: 'play', path: '/play/'}, 
            )
        })
        let exitButton = p5.createButton('Exit')
        exitButton.class("button button-raised button-round button-fill button-large")
        exitButton.style("margin-top", "1rem")
        exitButton.style("margin-bottom", "1rem")
        exitButton.style("margin-left", "0.5rem")
        exitButton.style("margin-right", "0.5rem")
        exitButton.style("background-color", "#ffff33")
        exitButton.style("color", "black")
        exitButton.style("width", "75%")
        exitButton.mousePressed(() => {
            store.dispatch('empty')
            window.f7.views.main.router.navigate(
                { name: 'loading', path: '/loading/'}, 
                { props: { redirectName: 'main_menu', redirectUrl: '/menu/' } }
            )
        })
        let buttonContainer = p5.createDiv()
        buttonContainer.child(tryAgainButton)
        buttonContainer.child(exitButton)
        buttonContainer.class('w-100 display-flex flex-direction-column justify-content-center align-items-center')
        buttonContainer.position(0, (vh/2) + 175)
    }

    const iconResult = () => {
        let iconContainer =  p5.createDiv(`
            <i class="icon material-icons" style="color: #fff !important; font-size: 12rem !important;">${item.data.category.icon}</i>
        `)
        iconContainer.class('w-100 display-flex flex-direction-row justify-content-center')
        iconContainer.position(0, (vh/2) - 115)
    }
    const textResult = () => {
        p5.push()
            p5.textFont('Poppins', 18)
            p5.textStyle(p5.BOLD)
            p5.textAlign(p5.CENTER)
            p5.fill("#fff")
            p5.text(`${item.data.name}`, vw/2, (vh/2) + 125)
        p5.pop()
    }
    p5.setup = () => {
        p5.createCanvas(vw, vh)
        p5.background('#1f203c')
        iconResult()
        buttonPrompts()
    }
    p5.draw = () => {  
        p5.background('#1f203c')
        showLight()
        textResult()
    }

    p5.windowResized = () => {
        vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
        vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
        p5.resizeCanvas(vw, vh)
    }
}