/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            backdropBlur: {
                xs: '2px',
            },
            boxShadow: {
                glow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)',
            },
        },
    },
    plugins: [],
};
