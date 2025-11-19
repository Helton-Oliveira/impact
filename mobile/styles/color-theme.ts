import {vars} from "nativewind";

export const themes = {
    light: vars({
        "--background-primary": "#F4F8F7",
        "--background-secondary": "#FFFFFF",

        "--text-default": "#0F1A17",
        "--text-secondary": "#7EE3D4",

        "--accent-primary": "#12EDC7",
        "--status-error": "#FF4136",

        "--state-disabled": "#DDE5E4",
        "--text-disabled": "rgba(100,100,100,0.35)",
    }),

    dark: vars({
        "--background-primary": "#0D221F",
        "--background-secondary": "#244742",

        "--text-default": "#FFFFFF",
        "--text-secondary": "#7EE3D4",

        "--accent-primary": "#12EDC7",

        "--status-error": "#FF4D4F",

        "--state-disabled": "#12EDC750",
        "--text-disabled": "rgba(255,255,255,0.3)",
    }),
};