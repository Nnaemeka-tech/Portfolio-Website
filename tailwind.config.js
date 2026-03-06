/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./*.html", "./case-studies/**/*.html"],
    theme: {
        extend: {
            colors: {
                midnight: "#0F172A", // Deep Midnight Slate
                surface: "#1E293B",  // Slate Grey Surface
                lime: "#BEF264",     // Cyber Lime Accent
            },
            fontFamily: {
                outfit: ["Outfit", "sans-serif"],
                mono: ["Fira Code", "monospace"],
            },
        },
    },
    plugins: [],
}
