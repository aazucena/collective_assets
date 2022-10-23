import { createIconButton } from './IconButton';

// More on default export: https://storybook.js.org/docs/html/writing-stories/introduction#default-export
export default {
    title: 'Framework7/Icon Button',
        // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
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
};

// More on component templates: https://storybook.js.org/docs/html/writing-stories/introduction#using-args
const Template = ({ label, ...args }) => {
  // You can either use a function to create DOM elements or use a plain html string!
  // return `<div>${label}</div>`;
    return createIconButton({ label, ...args });
};

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/html/writing-stories/args
Default.args = {
    iconName: 'bitcoin',
    filled: false,
    outline: false,
}
export const Outline = Template.bind({});
Outline.args = {
    outline: true,
    filled: false,
    iconName: 'bitcoin',
}
export const Filled = Template.bind({});
Filled.args = {
    outline: false,
    filled: true,
    iconName: 'bitcoin',
}
export const Large = Template.bind({});
Large.args = {
    size: 'large',
    outline: false,
    filled: true,
    iconName: 'bitcoin',
}

export const Small = Template.bind({});
Small.args = {
    size: 'small',
    outline: false,
    filled: true,
    iconName: 'bitcoin',
}
