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

export const SignUpEmail = ({ action_link = '' }: { action_link?: string }) => {
	return (
		<Html>
			<Tailwind>
				<Head />
				<Preview>Sign up link to Expense.fyi</Preview>
				<Body className="bg-white my-auto mx-auto font-sans">
					<Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
						<Section className="mt-[22px]">
							<Img src={`${baseUrl}/icons/logo.png`} width="50" height="50" alt="Logo" className="block m-auto" />
						</Section>
						<Heading className="text-black text-[24px] font-normal text-center p-0 mb-[24px] mt-[12px] mx-0">
							Magic Link
						</Heading>
						<Text className="text-black text-[14px] leading-[24px]">Hello,</Text>
						<Text className="text-black text-[14px] leading-[24px]">
							To create your account, kindly follow the link provided below. Please note that the link will expire in 10
							minutes.
						</Text>
						<Link
							className="bg-[#000000] p-2 px-2.5 mt-1 w-[60px] block rounded-md text-white text-[13px] font-normal no-underline text-center"
							href={action_link}
						>
							Sign up
						</Link>
						<Text className="text-black text-[14px] mt-[16px] mb-[10px] leading-[24px]">
							or if you are on mobile, copy and paste this URL into your browser:{' '}
							<Row>
								<Link className="text-[#cc35e5] break-all text-sm flex w-[465px] leading-[24px]">
									{action_link.replace(/^https?:\/\//, '')}
								</Link>
							</Row>
						</Text>
						<Text className="text-gray-500">If you didn{"'"}t try to Sign up, you can safely ignore this email.</Text>
						<Footnote hideNote={true} />
						<Footer />
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
};

export default SignUpEmail;
