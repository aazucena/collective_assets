import './vertical-navbar.css'

// setTimeout(() => {
//     var device = Framework7.getDevice()
//     var app = new Framework7({
//         name: 'Collective Assets', // App name
//         theme: 'auto', // Automatic theme detection
//         el: '#app', // App root element
//         id: 'io.framework7.collectiveassets', // App bundle ID
//         // Input settings
//         input: {
//             scrollIntoViewOnFocus: device.cordova && !device.electron,
//             scrollIntoViewCentered: device.cordova && !device.electron,
//         },
//         // Cordova Statusbar settings
//         statusbar: {
//             iosOverlaysWebView: true,
//             androidOverlaysWebView: false,
//         },
//         on: {
//             init: function () {
//                 var f7 = this;
//                 if (f7.device.cordova) {
//                     // Init cordova APIs (see cordova-app.js)
//                     cordovaApp.init(f7)
//                 }
//             },
//         },
//     })
// }, 1000)

export const createVerticalNavbar = ({
    items = [],
    position,
}) => {
    console.log(items)
    const nav = document.createElement('div')
    const getLinkElement = ({ type, label}) => {
        switch(type) {
            case 'icon':
                return `
                    <a href="#" class="link icon-only">
                        <i class="f7-icons">${label}_fill</i>
                    </a>
                `
            default:
                return `
                    <a href="#" class="link">
                        ${label}
                    </a>
                `
        }
    }

    nav.innerHTML = `
        <div class="navbar-bg transparent"></div>
        <div class="navbar-inner vertical ${position ?? ''}">
            ${items.map((item) => {
                return getLinkElement(item)
            }).join('\n')}
        </div>
    `
    nav.className = [
        'navbar',
        'no-shadow',
        'vertical',
    ].join(' ')
    return nav
}