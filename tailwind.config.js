/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    // darkMode: 'class',
    // theme: ['dark'],
    // important: true,
    daisyui: {
        themes: ['light', 'dark']
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
