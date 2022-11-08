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
		container: {
			padding: {
				DEFAULT: '1rem',
				ph: '0rem',
				sm: '0rem',
				md: '1rem',
				lg: '2rem',
				xl: '3rem',
				'2xl': '0rem',
			},
		},
		screens: {
			'ph': '400px',
			// => @media (min-width: 400px) { ... }

			'sm': '600px',
			// => @media (min-width: 640px) { ... }

			'md': '768px',
			// => @media (min-width: 768px) { ... }

			'lg': '1024px',
			// => @media (min-width: 1024px) { ... }

			'xl': '1280px',
			// => @media (min-width: 1280px) { ... }

			'2xl': '1530px',
			// => @media (min-width: 1536px) { ... }
		},
		extend: {},
	},
	plugins: [],
}
  