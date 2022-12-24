const websites = [
	'https://netflix.com',
	'https://www.zee5.com',
	'https://hotstar.com',
	'https://primevideo.com',
	'https://www.sonyliv.com',
	'https://www.aha.video',
	'https://www.spotify.com',
	'https://music.apple.com',
	'https://youtube.com',
	'https://apple.com',
	'https://icloud.com',
];

export const websitesMap = websites.reduce((acc, website) => {
	acc[website] = website;
	return acc;
}, {});

export default websites;
