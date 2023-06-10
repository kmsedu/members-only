module.exports = {
    content: ["./src/**/*.{html,js,ts,ejs}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Fira Sans"', "sans-serif"],
            },
        },
    },
    plugins: [require("@tailwindcss/typography"), require("daisyui")],
    daisyui: {
        themes: [
            {
                standard: {
                    primary: "#0284c7",
                    secondary: "#e7e5e4",
                    accent: "#7dd3fc",
                    neutral: "#4b5563",
                    "base-100": "#1f2937",
                    info: "#6366f1",
                    success: "#15803d",
                    warning: "#b45309",
                    error: "#dc2626",
                },
            },
        ],
    },
};
