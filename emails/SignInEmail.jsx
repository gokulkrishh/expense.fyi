import * as React from 'react';

import { Button, Container, Head, Html, Img, Link, Preview, Section, Text } from '@react-email/components';

import Footer from './Footer';
import Footnote from './Footnote';

const baseUrl = 'https://expense.fyi';

export default function SignInEmail({ magicLink = '', btnText = 'Sign in' }) {
	return (
		<Html>
			<Head />
			<Preview>Sign in Link for Expense.fyi</Preview>
			<Section style={main}>
				<Container style={container}>
					<Section style={{ marginTop: '20px' }}>
						<Img src={`${baseUrl}/static/icons/logo.png`} width="50" height="50" alt="Logo" style={logo} />
					</Section>
					<Text style={{ ...h1, marginTop: '20px' }}>Magic Link</Text>
					<Text style={text}>Hello!</Text>
					<Text style={text}>
						Please click the below link to <span style={{ fontWeight: 500 }}>{btnText}</span> to your account. This link
						will expire in <span style={{ fontWeight: 500 }}>10 minutes</span>.
					</Text>

					<Section style={{ textAlign: 'center' }}>
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
							href={magicLink}
						>
							{btnText}
						</Button>
					</Section>
					<Text style={text}>
						or if you are on mobile, copy and paste this URL into your browser:{' '}
						<Link style={{ ...link, display: 'block', marginTop: '15px', color: '#cc35e5' }} rel="nofollow">
							{magicLink.replace(/^https?:\/\//, '')}
						</Link>
					</Text>
					<Text style={{ ...text, color: '#666666' }}>
						If you didn{"'"}t try to {btnText}, you can safely ignore this email.
					</Text>
					<Footnote hideNote={true} />
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
	textAlign: 'center',
	margin: '30px 0',
	padding: '0',
	fontWeight: 600,
};

const link = {
	color: '#067df7',
	textDecoration: 'none',
};

const text = {
	color: '#000',
	fontFamily:
		"-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
	fontSize: '14px',
	lineHeight: '24px',
};
