const { guessProductionMode } = require('@ngneat/tailwind');

process.env.TAILWIND_MODE = guessProductionMode() ? 'build' : 'watch';

module.exports = {
    prefix: '',
    mode: 'jit',
    purge: {
        content: ['./src/**/*.{html,ts,css,scss,sass,less,styl}'],
    },
    darkMode: false, // or 'media' or 'class'
    theme: {
        colors: {
            primary: 'var(--color-primary)',
            secondary: 'var(--color-secondary)',
            warn: 'var(--color-warn)',
        },
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [require('@tailwindcss/typography')],
};
