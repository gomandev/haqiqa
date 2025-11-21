import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: {
                    50: '#f2fcf5',
                    100: '#e1f8e8',
                    200: '#c3eed4',
                    300: '#95deb6',
                    400: '#5cc593',
                    500: '#34a875', // Deep Emerald
                    600: '#23865b',
                    700: '#1c6b4a',
                    800: '#18553d',
                    900: '#144634',
                    950: '#0a281e',
                },
                secondary: {
                    50: '#f4f6f7',
                    100: '#e3e8eb',
                    200: '#c6d0d6',
                    300: '#9eaeb8',
                    400: '#748b9a',
                    500: '#566e7e', // Slate/Cool Grey
                    600: '#435765',
                    700: '#384752',
                    800: '#313c44',
                    900: '#2b333a',
                    950: '#1a2024',
                },
                accent: {
                    50: '#fffbf0',
                    100: '#fef5d6',
                    200: '#fce9aa',
                    300: '#fad673',
                    400: '#f8be3e',
                    500: '#f59e0b', // Rich Gold
                    600: '#d97706',
                    700: '#b45309',
                    800: '#92400e',
                    900: '#78350f',
                    950: '#451a03',
                }
            },
            fontFamily: {
                sans: ['var(--font-outfit)', 'sans-serif'],
                serif: ['var(--font-libre)', 'serif'],
            },
        },
    },
    plugins: [],
};
export default config;
