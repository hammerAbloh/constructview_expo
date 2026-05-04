/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                'neon-blue': '#00D9FF',
                'neon-green': '#00FF85',
                'dark-bg': '#0A0A0A',
            }
        },
    },
    plugins: [],
}