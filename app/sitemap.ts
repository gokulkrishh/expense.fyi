import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: 'https://expense.fyi',
			lastModified: new Date(),
		},
		{
			url: 'https://app.expense.fyi',
			lastModified: new Date(),
		},
		{
			url: 'https://app.expense.fyi/signin',
			lastModified: new Date(),
		},
		{
			url: 'https://app.expense.fyi/siginup',
			lastModified: new Date(),
		},
		{
			url: 'https://app.expense.fyi/expenses',
			lastModified: new Date(),
		},
		{
			url: 'https://app.expense.fyi/income',
			lastModified: new Date(),
		},
		{
			url: 'https://app.expense.fyi/investments',
			lastModified: new Date(),
		},
		{
			url: 'https://app.expense.fyi/settings',
			lastModified: new Date(),
		},
	];
}
