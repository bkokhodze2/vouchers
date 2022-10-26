/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx}",
		"./src/components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		colors: {
			gray: "#383838b3",
			orange: "#E35A43",
			purple: "#8338EC"
		},
		extend: {},
	},
	plugins: [],
}
  