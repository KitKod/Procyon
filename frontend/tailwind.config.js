const { guessProductionMode } = require('@ngneat/tailwind');

process.env.TAILWIND_MODE = guessProductionMode() ? 'build' : 'watch';
const colors = require('tailwindcss/colors');

module.exports = {
    prefix: '',
    mode: 'jit',
    purge: {
        content: ['./src/**/*.{html,ts,css,scss,sass,less,styl}'],
    },
    darkMode: false, // or 'media' or 'class'
    theme: {
        colors: {
            extend: {},
            transparent: 'transparent',
            current: 'currentColor',
            black: '#000',
            white: '#fff',
            bluegray: colors.blueGray,
            coolgray: colors.coolGray,
            gray: colors.gray,
            truegray: colors.trueGray,
            warmgray: colors.warmGray,
            red: colors.red,
            orange: colors.orange,
            amber: colors.amber,
            yellow: colors.yellow,
            lime: colors.lime,
            green: colors.green,
            emerald: colors.emerald,
            teal: colors.teal,
            cyan: colors.cyan,
            lightblue: colors.lightBlue,
            blue: colors.blue,
            indigo: colors.indigo,
            violet: colors.violet,
            purple: colors.purple,
            fuchsia: colors.fuchsia,
            pink: colors.pink,
            rose: colors.rose,
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require('@tailwindcss/typography')],
};
