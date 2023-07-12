import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
	return {
		short_name: 'Expense.fyi',
		name: 'Expense.fyi',
		description: 'Effortlessly Track and Manage your Expenses.',
		display: 'standalone',
		orientation: 'portrait',
		icons: [
			{
				src: '/static/icons/android-chrome-192x192.png',
				sizes: '192x192',
				type: 'image/png',
			},
			{
				src: '/static/icons/android-chrome-512x512.png',
				sizes: '512x512',
				type: 'image/png',
			},
		],
		start_url: '/?utm_source=homescreen',
		theme_color: '#09090b',
		background_color: '#09090b',
	};
}
