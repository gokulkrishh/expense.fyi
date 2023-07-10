import * as React from 'react';

import { Body, Container, Head, Html, Img, Link, Preview, Section, Text } from '@react-email/components';

import ButtonLink from './button-link';
import Footer from './footer';
import Footnote from './footnote';

const baseUrl = 'https://expense.fyi';
const logoUrl = `${baseUrl}/static/icons/logo.png`;

export const SignInEmail = ({ action_link = '' }: { action_link?: string }) => {
	return (
		<Html>
			<Head />
			<Preview>Sign in link to Expense.fyi</Preview>
			<Body style={main}>
				<Container style={container}>
					<Img src={`${logoUrl}`} width="50" height="50" alt="Logo" style={logo} />
					<Section>
						<Text style={{ ...h1, marginTop: '20px', textAlign: 'center' }}>Magic Link</Text>
						<Text style={text}>Hello</Text>
						<Text style={text}>
							Please click the below link to Sign in to your account. This link will expire in 10 minutes.
						</Text>
						<Section style={{ textAlign: 'left' }}>
							<ButtonLink href={action_link} btnText="Sign in" />
						</Section>
						<Text style={text}>
							or if you are on mobile, copy and paste this URL into your browser:{' '}
							<Link style={{ ...link, display: 'block', marginTop: '15px', color: '#cc35e5' }} rel="nofollow">
								{action_link.replace(/^https?:\/\//, '')}
							</Link>
						</Text>
						<Text style={{ ...text, color: '#666666' }}>
							If you didn{"'"}t try to Sign in, you can safely ignore this email.
						</Text>
						<Footnote hideNote={true} />
						<Footer />
					</Section>
				</Container>
			</Body>
		</Html>
	);
};

export default SignInEmail;

const main = {
	backgroundColor: '#efeef1',
	margin: '0 auto',
};

const container = {
	backgroundColor: '#ffffff',
	borderRadius: '5px',
	margin: '40px auto',
	padding: '20px',
	width: '465px',
};

const button = {
	backgroundColor: '#007ee6',
	borderRadius: '4px',
	color: '#fff',
	fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
	fontSize: '15px',
	textDecoration: 'none',
	textAlign: 'center' as const,
	display: 'block',
	width: '210px',
	paddingTop: '15px',
	paddingBottom: '15px',
};

const logo = {
	margin: '0 auto',
};

const h1 = {
	color: '#000',
	fontFamily:
		"-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
	fontSize: '24px',
	fontWeight: '500',
	margin: '30px 0',
	padding: '0',
};

const link = {
	color: '#0669ce',
	textDecoration: 'none',
};

const text = {
	color: '#000',
	fontFamily:
		"-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
	fontSize: '14px',
	lineHeight: '24px',
};

const anchor = {
	textDecoration: 'underline',
};
