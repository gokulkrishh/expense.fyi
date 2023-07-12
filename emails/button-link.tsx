import { Button } from '@react-email/components';

export default function ButtonLink({ href, btnText }: { href: string; btnText: string }) {
	return (
		<Button pX={16} pY={8} style={{ ...btn, textAlign: 'center' }} href={href}>
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
	fontWeight: 400,
	lineHeight: '50px',
	textDecoration: 'none',
};
