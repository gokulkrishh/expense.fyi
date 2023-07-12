module.exports = {
	darkMode: 'class',
	content: [
		'./app/**/*.{js,ts,jsx,tsx}',
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
		'./node_modules/@tremor/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			animation: {
				enter: 'fadeInBottom 300ms ease-out',
				leave: 'fadeInTop 300ms ease-in forwards',
			},
			keyframes: {
				fadeInBottom: {
					'0%': {
						opacity: '0',
						transform: 'translateY(-2rem)',
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)',
					},
				},
				fadeInTop: {
					'0%': {
						opacity: '1',
					},
					'100%': {
						opacity: '0',
					},
				},
			},
		},
		screens: {
			xs: '480px',
			// => @media (min-width: 480px) { ... }

			sm: '640px',
			// => @media (min-width: 640px) { ... }

			md: '768px',
			// => @media (min-width: 768px) { ... }

			lg: '1024px',
			// => @media (min-width: 1024px) { ... }

			xl: '1280px',
			// => @media (min-width: 1280px) { ... }
		},
	},
	plugins: [],
};
