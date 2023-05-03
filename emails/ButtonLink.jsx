import { Button } from '@react-email/components';

function ButtonLink({ href, btnText }) {
	return (
		<Button
			pX={16}
			pY={10}
			style={{
				backgroundColor: '#171717',
				borderRadius: '5px',
				color: '#fff',
				fontFamily:
					"-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
				fontSize: '14px',
				fontWeight: 500,
				lineHeight: '50px',
				textDecoration: 'none',
				textAlign: 'center',
			}}
			href={href}
		>
			{btnText}
		</Button>
	);
}

const btn = {
	backgroundColor: '#171717',
	borderRadius: '5px',
	color: '#fff',
	fontFamily:
		"-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
	fontSize: '14px',
	fontWeight: 500,
	lineHeight: '50px',
	textDecoration: 'none',
	textAlign: 'center',
};

export default ButtonLink;
