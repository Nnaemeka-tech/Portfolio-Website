/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './*.html',
        './case-studies/**/*.html',
        './industries/**/*.html',
        './services/**/*.html',
        './insights/**/*.html',
    ],
    theme: {
        extend: {
            colors: {
                slate: {
                    850: '#151b2e',
                    900: '#0f172a',
                    950: '#020617',
                },
                cyan: {
                    400: '#22d3ee',
                    500: '#06b6d4',
                },
                teal: {
                    400: '#2dd4bf',
                    500: '#14b8a6',
                },
                brand: {
                    accent: 'var(--brand-accent, #00dc82)',
                    crm: '#6366f1',
                    error: '#ef4444',
                },
            },
            fontFamily: {
                mono: ['"Fira Code"', '"Courier New"', 'monospace'],
                sans: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
            },
            animation: {
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                cursor: 'cursor 1s step-end infinite',
                scroll: 'scroll 20s linear infinite',
            },
            keyframes: {
                cursor: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0' },
                },
                scroll: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
            },
        },
    },
    plugins: [],
};
