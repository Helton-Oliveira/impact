/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./mobile/app/**/*.{js,jsx,ts,tsx}",
        "./mobile/components/**/*.{js,jsx,ts,tsx}",
        "./mobile/src/**/*.{js,jsx,ts,tsx}"
    ],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: require("./mobile/styles/styles")
        },
    },
    plugins: [],
}