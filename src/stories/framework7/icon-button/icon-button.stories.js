import { createIconButton } from './IconButton';

export default {
    title: 'Framework7/Icon Button',
        argTypes: {
                backgroundColor: { control: 'color' },
                iconName: { control: 'text' },
                onClick: { action: 'onClick' },
                outline: { control: 'boolean' },
                filled: { control: 'boolean' },
                size: {
                control: { type: 'select' },
                options: ['small', 'medium', 'large'],
        },
    },
}

const Template = ({ label, ...args }) => {
    return createIconButton({ label, ...args })
}

export const Default = Template.bind({})
Default.args = {
    iconName: 'bitcoin',
    filled: false,
    outline: false,
}
export const Outline = Template.bind({})
Outline.args = {
    outline: true,
    filled: false,
    iconName: 'bitcoin',
}
export const Filled = Template.bind({})
Filled.args = {
    outline: false,
    filled: true,
    iconName: 'bitcoin',
}
export const Large = Template.bind({})
Large.args = {
    size: 'large',
    outline: false,
    filled: true,
    iconName: 'bitcoin',
}

export const Small = Template.bind({})
Small.args = {
    size: 'small',
    outline: false,
    filled: true,
    iconName: 'bitcoin',
}
