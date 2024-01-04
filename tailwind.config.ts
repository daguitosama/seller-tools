import type { Config } from "tailwindcss";
// import defaultTheme from "tailwindcss/defaultTheme";
export default {
    content: ["./app/**/*.{ts,tsx,jsx,js}"],
    theme: {
        extend: {
            fontSize: {
                xss: "7px",
            },
            fontFamily: {
                condensed: '"Deja Vu Sans Condensed"',
            },
        },
    },
    plugins: [],
} satisfies Config;
