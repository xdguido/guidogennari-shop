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

                    neutral: '#6b7280',

                    'base-100': '#f3f4f6',

                    info: '#3ABFF8',

                    success: '#36D399',

                    warning: '#FBBD23',

                    error: '#F87272'
                }
            },
            {
                dark: {
                    primary: '#047857',

                    secondary: '#fb923c',

                    accent: '#e879f9',

                    neutral: '#4b5563',

                    'base-100': '#111827',

                    info: '#3ABFF8',

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
