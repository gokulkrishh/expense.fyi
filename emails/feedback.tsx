import * as React from 'react';

import { Container, Head, Html, Img, Preview, Section, Text } from '@react-email/components';

import Footer from './footer';

const baseUrl = 'https://expense.fyi';

export default function FeedbackEmail({ message = '', email = '' }: { message?: string; email?: string }) {
	return (
		<Html>
			<Head />
			<Preview>New Feedback Received</Preview>
			<Section style={main}>
				<Container style={container}>
					<Section style={{ marginTop: '20px' }}>
						<Img src={`${baseUrl}/static/icons/logo.png`} width="50" height="50" alt="Logo" style={logo} />
					</Section>
					<Text style={{ ...h1, marginTop: '20px' }}>New Feedback</Text>
					<Text style={{ ...text, marginTop: '10px', marginBottom: '5px' }}>From: {email}</Text>
					<Text style={{ ...text, marginTop: '0px' }}>{message}</Text>
					<Footer />
				</Container>
			</Section>
		</Html>
	);
}

const main = {
	backgroundColor: '#ffffff',
	margin: '0 auto',
};

const container = {
	border: '1px solid #eaeaea',
	borderRadius: '5px',
	margin: '40px auto',
	padding: '20px',
	width: '465px',
};

const logo = {
	margin: '0 auto',
};

const h1 = {
	color: '#000',
	fontFamily:
		"-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
	fontSize: '24px',
	fontWeight: 'normal',
	margin: '30px 0',
	padding: 0,
};

const text = {
	color: '#000',
	fontFamily:
		"-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
	fontSize: '14px',
	lineHeight: '24px',
};
