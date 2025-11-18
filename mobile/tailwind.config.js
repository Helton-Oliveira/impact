/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
    darkMode: "media",
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: require("./styles/styles")
        },
    },
    plugins: [],
}