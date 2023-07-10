import * as React from 'react';

import { Body, Container, Head, Html, Img, Link, Preview, Section, Text } from '@react-email/components';
import ButtonLink from './button-link';
import Footer from './footer';
import Footnote from './footnote';

const baseUrl = 'https://expense.fyi';
const appUrl = 'https://app.expense.fyi';
const githubUrl = 'https://github.com/gokulkrishh/expense.fyi';
const twitterUrl = 'https://twitter.com/gokul_i';
const demoVideoUrl = `https://www.youtube.com/watch?v=faueh3BZXCo`;

export default function WelcomeEmail() {
	return (
		<Html>
			<Head />
			<Preview>Welcome to Expense.fyi</Preview>
			<Section style={main}>
				<Container style={container}>
					<Section style={{ marginTop: '20px' }}>
						<Img src={`${baseUrl}/static/icons/logo.png`} width="50" height="50" alt="Logo" style={logo} />
					</Section>
					<Text style={{ ...h1, marginTop: '20px' }}>Welcome to Expense.fyi</Text>
					<Text style={text}>
						Hi,
						I{"'"}m Gokul, creator of the Expense.fyi, an open-source app to deliver financial clarity through spending
						analysis. We are excited to have you on board.
					</Text>
					<Text style={text}>Here is how you can get started:</Text>
					<Text style={{ ...text, margin: '8px' }}>
						1. Watch this{' '}
						<Link href={demoVideoUrl} target="_blank" style={{ ...link, textDecoration: 'underline' }}>
							demo video
						</Link>{' '}
						to know how its done in Expense.fyi.
					</Text>
					<Text style={{ ...text, margin: '8px' }}>
						2. Star our{' '}
						<Link href={githubUrl} target="_blank" style={{ ...link, textDecoration: 'underline' }}>
							Github
						</Link>{' '}
						repository.
					</Text>
					<Text style={{ ...text, margin: '8px' }}>
						3. Follow us on{' '}
						<Link href={twitterUrl} target="_blank" style={{ ...link, textDecoration: 'underline' }}>
							Twitter
						</Link>
						.
					</Text>
					<Text style={{ ...text, margin: '8px' }}>4. Finally, spread some word about us.</Text>

					<Section style={{ marginTop: '20px', marginBottom: '20px', textAlign: 'center' }}>
						<ButtonLink href={appUrl} btnText="Get started" />
					</Section>

					<Footnote />
					<Footer />
				</Container>
			</Section>
		</Html>
	);
}

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

const logo = {
	margin: '0 auto',
};

const h1 = {
	color: '#000',
	fontFamily:
		"-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
	fontSize: '24px',
	fontWeight: '500',
	textAlign: 'center' as const,
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