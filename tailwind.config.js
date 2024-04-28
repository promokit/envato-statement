/** @type {import('tailwindcss').Config} */
export default {
    content: ['./public/**/*.html', './app/**/*.{js,ts,jsx,tsx}'],
    theme: {
        fontFamily: {
            tinos: ['Tinos', 'serif'],
            opensans: ['Open Sans', 'sans-serif'],
        },
    },
    plugins: [],
    mode: 'jit',
};
