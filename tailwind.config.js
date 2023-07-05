/** @type {import('tailwindcss').Config} */

function withOpacityValue(variable) {
    return ({ opacityValue }) => {
        if (opacityValue === undefined) {
            return `hsl(var(${variable}))`;
        }
        return `hsl(var(${variable}) / ${opacityValue})`;
    };
}

module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'base-container': withOpacityValue('--base-container')
            }
        }
    },
    daisyui: {
        themes: [
            {
                light: {
                    ...require('daisyui/src/colors/themes')['[data-theme=light]'],
                    '--base-container': '0 0% 91%',

                    primary: '#047857',

                    secondary: '#fb923c',

                    accent: '#e879f9',

                    neutral: '#a3a3a3',

                    'base-100': '#f7f7f7',

                    info: '#3b82f6',

                    success: '#22c55e',

                    warning: '#FBBD23',

                    error: '#F87272'
                }
            },
            {
                dark: {
                    ...require('daisyui/src/colors/themes')['[data-theme=dark]'],
                    '--base-container': '0 0% 10%',

                    primary: '#047857',

                    secondary: '#fb923c',

                    accent: '#e879f9',

                    neutral: '#8f8f8f',

                    'base-100': '#0a0a0a',

                    info: '#3b82f6',

                    success: '#36D399',

                    warning: '#FBBD23',

                    error: '#F87272'
                }
            }
        ]
    },
    corePlugins: {
        aspectRatio: false
    },
    plugins: [
        require('daisyui'),
        require('@tailwindcss/aspect-ratio'),
        require('@tailwindcss/forms')
    ]
};
