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
                'base-contrast': withOpacityValue('--base-contrast')
            }
        }
    },
    daisyui: {
        themes: [
            {
                light: {
                    ...require('daisyui/src/colors/themes')['[data-theme=light]'],
                    '--base-contrast': '0 0% 99.5%',

                    primary: '#059669',

                    secondary: '#86efac',

                    accent: '#3b82f6',

                    neutral: '#b8b8b8',

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
                    '--base-contrast': '0 0% 1%',

                    primary: '#059669',

                    secondary: '#86efac',

                    accent: '#3b82f6',

                    neutral: '#555555',

                    'base-100': '#171717',

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
        require('@tailwindcss/forms'),
        require('prettier-plugin-tailwindcss')
    ]
};
