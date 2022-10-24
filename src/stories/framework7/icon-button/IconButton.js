import './icon-button.css'

setTimeout(() => {
    var device = Framework7.getDevice()
    var app = new Framework7({
        name: 'Collective Assets', // App name
        theme: 'auto', // Automatic theme detection
        el: '#app', // App root element
        id: 'io.framework7.collectiveassets', // App bundle ID
        // Input settings
        input: {
            scrollIntoViewOnFocus: device.cordova && !device.electron,
            scrollIntoViewCentered: device.cordova && !device.electron,
        },
        // Cordova Statusbar settings
        statusbar: {
            iosOverlaysWebView: true,
            androidOverlaysWebView: false,
        },
        on: {
            init: function () {
                var f7 = this;
                if (f7.device.cordova) {
                    // Init cordova APIs (see cordova-app.js)
                    cordovaApp.init(f7)
                }
            },
        },
    })
}, 1000)


export const createIconButton = ({
    size = 'medium',
    backgroundColor,
    label,
    filled = true,
    iconName,
    onClick,
    outline = false,
}) => {
    const btn = document.createElement('button')
    btn.type = 'button'
    btn.innerHTML = !!iconName === true ? 
    `
        <i class="icon f7-icons color-yellow">${iconName}</i>
    ` : label
    btn.addEventListener('click', onClick)
    btn.className = [
        'button',
        'button-circle',
        ...((size !== 'medium') ? [`button-${size}`] : []), 
        ...((filled === true) ? ['button-fill'] : []),
        ...((outline === true) ? [`button-outline`] : []), 
        'icon-button',
    ].join(' ')

    btn.style.backgroundColor = backgroundColor
    return btn
}
