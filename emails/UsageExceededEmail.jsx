import * as React from 'react';

import { Button, Container, Head, Html, Img, Preview, Section, Text } from '@react-email/components';

import Footer from './Footer';
import Footnote from './Footnote';

const baseUrl = 'https://expense.fyi';
const settingUrl = 'https://app.expense.fyi/settings';

export default function UsageExceededEmail({ plan = 'Basic Plan', usage = 0, maxUsageLimit = 100, isExpired = false }) {
	return (
		<Html>
			<Head />
			<Preview>{`${plan} usage exceeded!`}</Preview>
			<Section style={main}>
				<Container style={container}>
					<Section style={{ marginTop: '20px' }}>
						<Img src={`${baseUrl}/static/icons/logo.png`} width="50" height="50" alt="Logo" style={logo} />
					</Section>
					<Text style={{ ...h1, marginTop: '20px' }}>Usage Limit Reached</Text>
					<Text style={{ ...text, marginTop: '30px', marginBottom: '10px' }}>Hi!</Text>
					<Text style={{ ...text, marginTop: '0px', marginBottom: '0px' }}>
						Your account has <span style={{ fontWeight: 500 }}>exceeded</span> the usage limit of{' '}
						<span style={{ fontWeight: 500 }}>{maxUsageLimit} entries</span> for{' '}
						<span style={{ fontWeight: 500 }}>{plan}</span>.
					</Text>
					<Text style={{ ...text, marginTop: '10px' }}>
						No worries, all data still there. Upgrade to <span style={{ fontWeight: 500 }}>Premium Plan</span> to
						increase the entry limit and get all the Premium features.
					</Text>

					<Section style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>
						<Button pX={16} pY={10} style={btn} href={settingUrl}>
							Upgrade now
						</Button>
					</Section>

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
	fontWeight: 600,
};

const text = {
	color: '#000',
	fontFamily:
		"-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
	fontSize: '14px',
	lineHeight: '24px',
};

const btn = {
	backgroundColor: '#000',
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
