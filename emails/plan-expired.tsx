import * as React from 'react';

import { Container, Head, Html, Img, Preview, Section, Text } from '@react-email/components';

import ButtonLink from './button-link';
import Footer from './footer';
import Footnote from './footnote';

const baseUrl = 'https://expense.fyi';
const settingUrl = 'https://app.expense.fyi/settings';

export default function PlanExpiredEmail({ plan = 'Premium Plan' }) {
	return (
		<Html>
			<Head />
			<Preview>{`${plan} Expired!`}</Preview>
			<Section style={main}>
				<Container style={container}>
					<Section style={{ marginTop: '20px' }}>
						<Img src={`${baseUrl}/static/icons/logo.png`} width="50" height="50" alt="Logo" style={logo} />
					</Section>
					<Text style={{ ...h1, marginTop: '20px' }}>{plan} Expired</Text>
					<Text style={{ ...text, marginTop: '30px', marginBottom: '10px' }}>Hi!</Text>
					<Text style={{ ...text, marginTop: '0px', marginBottom: '0px' }}>
						Your account{"'"}s <b>{plan}</b> has expired.
					</Text>
					<Text style={{ ...text, marginTop: '10px' }}>
						No worries, all data still there. Renew <b>Premium Plan</b> to continue enjoying premium features on
						Expense.fyi.
					</Text>

					<Section style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>
						<ButtonLink href={settingUrl} btnText="Renew now" />
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
	backgroundColor: '#ffffff',
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
	fontWeight: 500,
	textAlign: 'center' as const,
	margin: '30px 0',
	padding: '0',
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
