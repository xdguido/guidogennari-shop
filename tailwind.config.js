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
                    primary: '#f4572c',
                    secondary: '#6746ea',
                    accent: '#ffcfcc',
                    neutral: '#14161F',
                    'base-100': '#f3f4f6',
                    info: '#94BFE6',
                    success: '#1C977A',
                    warning: '#F2BC07',
                    error: '#F63159'
                },
                dark: {
                    primary: '#f4572c',
                    secondary: '#6746ea',
                    accent: '#ffcfcc',
                    neutral: '#14161F',
                    'base-100': '#1f2937',
                    info: '#94BFE6',
                    success: '#1C977A',
                    warning: '#F2BC07',
                    error: '#F63159'
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
