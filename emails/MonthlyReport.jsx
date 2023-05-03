import * as React from 'react';

import { Container, Head, Html, Img, Preview, Section, Text } from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';

import Footer from './Footer';
import MetricCard from './MetricCard';

const baseUrl = 'https://expense.fyi';

export default function FeedbackEmail({
	forMonth = 'May 2023',
	currency = 'INR',
	locale = 'en',
	expenses = {
		category: [
			{ name: 'Bills', amount: '$ 5,100' },
			{ name: 'Entertainment', amount: '$ 2,500' },
			{ name: 'Orders', amount: '$ 1,500' },
		],
	},
}) {
	return (
		<Html>
			<Head />
			<Preview>Your monthly expense report</Preview>
			<Section style={main}>
				<Tailwind>
					<Container style={container}>
						<Section style={{ marginTop: '20px' }}>
							<Img src={`${baseUrl}/static/icons/logo.png`} width="50" height="50" alt="Logo" style={logo} />
						</Section>
						<Text style={{ ...h1, marginTop: '20px', marginBottom: '0' }}>Expense Report</Text>
						<Text style={{ ...text, lineHeight: '6px', textAlign: 'center', color: '#000', fontWeight: 500 }}>
							{forMonth}
						</Text>
						<Text style={{ ...text, marginTop: '20px', marginBottom: '0px' }}>Hello,</Text>
						<Text style={{ ...text, marginTop: '5px', marginBottom: '0px' }}>
							Here is an overview of your expenses for this month.
						</Text>

						<Section style={{ marginTop: '20px' }}>
							<MetricCard title="TOTAL INCOME" data={'$ 50,000'} />
							<MetricCard title="TOTAL EXPENSES" data={'$ 30,000'} />
						</Section>

						<Section>
							<Text style={{ ...h2, marginTop: '5px', marginBottom: '10px', fontWeight: '600' }}>
								Top Expenses Category
							</Text>

							{expenses.category.map((category, index) => {
								return (
									<Text
										key={category.name}
										style={{
											...text,
											marginTop: '5px',
											marginBottom: '0px',
											paddingBottom: '2px',
											fontSize: '16px',
										}}
									>
										{index + 1}. {category.name} <span style={{ float: 'right' }}>{category.amount}</span>
									</Text>
								);
							})}
						</Section>
						<Footer />
					</Container>
				</Tailwind>
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

const h2 = {
	color: '#000',
	fontFamily:
		"-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
	fontSize: '18px',
	fontWeight: 'normal',
	textAlign: 'left',
	margin: '30px 0',
	padding: '0',
};
