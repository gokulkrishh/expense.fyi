import * as React from 'react';

import { Body, Container, Head, Heading, Html, Img, Preview, Section, Tailwind, Text } from '@react-email/components';

import Footer from './footer';

const baseUrl = 'https://expense.fyi';

export default function FeedbackEmail({ message = '', email = '' }: { message?: string; email?: string }) {
	return (
		<Html>
			<Tailwind>
				<Head />
				<Preview>New Feedback Received</Preview>
				<Body className="bg-white my-auto mx-auto font-sans">
					<Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
						<Section className="mt-[22px]">
							<Img src={`${baseUrl}/icons/logo.png`} width="50" height="50" alt="Logo" className="block m-auto" />
						</Section>
						<Heading className="text-black text-[24px] font-normal text-center p-0 mb-[24px] mt-[12px] mx-0">
							New Feedback
						</Heading>
						<Text className="text-black text-[14px] leading-[24px]">
							From: <Text>{email}</Text>
						</Text>
						<Text className="text-black text-[14px] leading-[24px]">{message}</Text>
						<Footer />
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
}
