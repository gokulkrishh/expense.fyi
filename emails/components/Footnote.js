import { Text } from '@react-email/text';

export default function Footnote() {
	return (
		<>
			<Text style={{ ...text, color: '#666666', marginBottom: '5px' }}>
				Let me know if you have any questions or feedback by simply replying to this email.
			</Text>
			<Text style={{ ...text, color: '#666666' }}>
				Cheers, <br />
				Gokul from Expense.fyi
			</Text>
		</>
	);
}

const text = {
	color: '#000',
	fontFamily:
		"-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
	fontSize: '14px',
	lineHeight: '24px',
};
