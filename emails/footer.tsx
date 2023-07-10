import { Hr, Link, Text } from '@react-email/components';

const baseUrl = 'https://expense.fyi';

export default function Footer() {
	return (
		<>
			<Hr style={hr} />
			<Text style={footer}>
				&copy; {new Date().getFullYear()}{' '}
				<Link href={baseUrl} target="_blank" style={{ ...link, textDecoration: 'underline' }}>
					Expense.fyi
				</Link>{' '}
				· Effortlessly track and manage your expenses.
			</Text>
		</>
	);
}

const link = {
	color: '#0669ce',
	textDecoration: 'none',
};

const footer = {
	color: '#666666',
	fontFamily:
		"-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
	fontSize: '12px',
	lineHeight: '24px',
};

const hr = {
	border: 'none',
	borderTop: '1px solid #eaeaea',
	margin: '26px 0',
	width: '100%',
};
