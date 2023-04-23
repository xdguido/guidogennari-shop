/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    // darkMode: 'class',
    // theme: ['dark'],
    // important: true,
    daisyui: {
        themes: [
            {
                light: {
                    primary: '#047857',

                    secondary: '#fb923c',

                    accent: '#e879f9',

                    neutral: '##a3a3a3',

                    'base-100': '#f3f4f6',

                    info: '#3b82f6',

                    success: '#22c55e',

                    warning: '#FBBD23',

                    error: '#F87272'
                }
            },
            {
                dark: {
                    primary: '#047857',

                    secondary: '#fb923c',

                    accent: '#e879f9',

                    neutral: '#8f8f8f',

                    'base-100': '#0f0f0f',

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
