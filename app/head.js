import configs from './defaults';
import DefaultTags from './DefaultTags';

export default function Head() {
	return (
		<>
			<title>{configs.title}</title>
			<meta name='description' content={configs.title} />
			<DefaultTags />
		</>
	);
}
