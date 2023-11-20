import * as React from 'react';

import {
	Body,
	Container,
	Head,
	Heading,
	Html,
	Img,
	Link,
	Preview,
	Row,
	Section,
	Tailwind,
	Text,
} from '@react-email/components';

import Footer from './footer';
import Footnote from './footnote';

const baseUrl = 'https://expense.fyi';

export const SignInEmail = ({ action_link = '' }: { action_link?: string }) => {
	return (
		<Html>
			<Head />
			<Preview>Sign in link to Expense.fyi</Preview>
			<Tailwind>
				<Body className="bg-white my-auto mx-auto font-sans">
					<Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
						<Section className="mt-[22px] flex justify-center ">
							<Img src={`${baseUrl}/icons/logo.png`} width="50" height="50" alt="Logo" />
						</Section>
						<Heading className="text-black text-[24px] font-normal text-center p-0 mb-[24px] mt-[12px] mx-0">
							Magic Link
						</Heading>
						<Text className="text-black text-[14px] leading-[24px]">Hello,</Text>
						<Text className="text-black text-[14px] leading-[24px]">
							Please click the below link to Sign in to your account. This link will expire in 10 minutes.
						</Text>
						<Link
							className="bg-[#000000] p-2.5 px-3 rounded-md text-white text-[12px] font-medium no-underline text-center"
							href={action_link}
						>
							Sign in
						</Link>
						<Text className="text-black text-[14px] leading-[24px]">
							or if you are on mobile, copy and paste this URL into your browser:{' '}
							<Row>
								<Link className="text-[#cc35e5] break-all text-sm flex w-[465px]">
									{action_link.replace(/^https?:\/\//, '')}
								</Link>
							</Row>
						</Text>
						<Footnote hideNote={true} />
						<Footer />
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
};

export default SignInEmail;
