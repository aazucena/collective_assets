import { createVerticalNavbar } from "./VerticalNavbar"

export default {
    title: 'Framework7/Vertical Navbar',
    argTypes: {
        items: { control: 'object' },
        position: {
            control: { type: 'select' },
            options: [
                'top',
                'bottom',
                'center',
                'left',
                'right',
                'top-left',
                'bottom-left',
                'center-left',
                'center-right',
                'top-right',
                'bottom-right',
            ],
        }
    }
}

const Template = ({...args}) => {
    return createVerticalNavbar(args)
}

export const Default = Template.bind({})
Default.args = {
    items: [
        { type: 'icon', label: 'house' },
        { type: 'text', label: 'test' },
        { type: 'icon', label: 'bitcoin' },
        { type: 'text', label: 'answer' },
    ]
}