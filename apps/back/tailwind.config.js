const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
        ...createGlobPatternsForDependencies(__dirname),
    ],
    theme: {
        extend: {},
    },
    daisyui: {
        themes: [
            {
                mytheme: {
                    "primary": "#075985",
                    "secondary": "#0e7490",
                    "accent": "#22d3ee",
                    "neutral": "#716e6e",
                    "base-100": "#171717",
                    "info": "#0090e3",
                    "success": "#16a34a",
                    "warning": "#fbbf24",
                    "error": "#dc2626",
                },
            },
            "nord"
        ],
    },
    plugins: [require("@tailwindcss/typography"), require("daisyui")]
};
