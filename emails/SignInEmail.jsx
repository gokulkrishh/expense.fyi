import * as React from 'react';

import { Container } from '@react-email/container';
import { Head } from '@react-email/head';
import { Html } from '@react-email/html';
import { Img } from '@react-email/img';
import { Link } from '@react-email/link';
import { Preview } from '@react-email/preview';
import { Section } from '@react-email/section';
import { Text } from '@react-email/text';

import ButtonLink from './components/ButtonLink';
import Footer from './components/Footer';
import Footnote from './components/Footnote';

const baseUrl = 'https://expense.fyi';

export default function SignInEmail({ magicLink = '', btnText = 'Sign in' }) {
	return (
		<Html>
			<Head />
			<Preview>Sign in Link for Expense.fyi</Preview>
			<Section style={main}>
				<Container style={container}>
					<Section style={{ marginTop: '20px' }}>
						<Img src={`${baseUrl}/static/icons/logo.png`} width="44" height="44" alt="Logo" style={logo} />
					</Section>
					<Text style={h1}>Magic Link</Text>
					<Text style={text}>Hello!</Text>
					<Text style={text}>
						Please click the below link to {btnText} to your account. This link will expire in 10 minutes.
					</Text>

					<Section style={{ textAlign: 'left' }}>
						<ButtonLink href={magicLink} btnText={btnText} />
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
					<Footnote />
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
