/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	content: ["./src/**/*.{html,hbs,js}"],
	theme: {
		container: {
			padding: "1rem",
			center: true,
			screens: {
				...defaultTheme.screens,
				sm: "100%",
				md: "100%",
			},
		},
		extend: {
			colors: {
				primary: "rgb(165, 201, 38)",
				yellow: "#FEC135",
				pink: "#F14E6B",
			},
			fontFamily: {
				varela: ["Varela Round", "sans-serif"],
				openSans: ["Open Sans", "sans-serif"],
			},
			fontSize: {
				xs: 0.75 + "rem", // 12px
				sm: 0.8125 + "rem", // 13px
				base: 0.875 + "rem", // 14px
				md: 0.938 + "rem", // 15px
				lg: 1.25 + "rem", // 20px
				xl: 1.375 + "rem", // 22px
				"3xl": 1.75 + "rem", // 28px
				"3.5xl": 2 + "rem", //32px
				"5xl": 2.5 + "rem", // 40px
			},
			animation: {
				menuSlideUp: "menuSlideUp 200ms ease-in-out forwards",
				menuSlideDown: "menuSlideDown 300ms ease-in-out forwards",
				fadyScaleUp: "scaleUp 400ms ease-in-out forwards, fadeIn 400ms ease-in-out forwards",
				zoomIn: "zoomIn 300ms ease-in-out forwards",
				zoomOut: "zoomOut 200ms ease-in-out forwards",
			},
			keyframes: {
				menuSlideUp: {
					"0%": {
						transform: "translateY(0)",
					},
					"100%": {
						transform: "translateY(-100%)",
					},
				},
				menuSlideDown: {
					"0%": {
						transform: "translateY(-100%)",
					},
					"100%": {
						transform: "translateY(0%)",
					},
				},
				scaleUp: {
					"0%": {
						transform: "scale3d(0.5,0.5,0.5)",
					},
					"100%": {
						transform: "scale3d(1,1,1)",
					},
				},
				fadeIn: {
					"0%": {
						opacity: 0,
					},
					"100%": {
						opacity: 1,
					},
				},
				zoomIn: {
					"0%": {
						transform: "scale3d(0.8,0.8,0.8)",
						opacity: 0,
					},
					"100%": {
						opacity: 1,
					},
				},
				zoomOut: {
					"0%": {
						opacity: 1,
					},
					"100%": {
						transform: "scale3d(0.8,0.8,0.8)",
						opacity: 0,
					},
				},
			},
		},
	},
	plugins: [],
};
