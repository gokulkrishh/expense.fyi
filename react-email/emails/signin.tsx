import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import * as React from 'react';
import ButtonLink from './button-link';
import Footnote from './footnote';
import Footer from './footer';

const baseUrl = 'https://expense.fyi';
const logoUrl = `${baseUrl}/static/icons/logo.png`

interface SignInEmailProps {
  action_link?: string,
  btnText?: string,
}

export const SignInEmail: React.FC<Readonly<SignInEmailProps>> = ({ action_link = '', btnText = 'Sign in' }) => {
  return (
    <Html>
      <Head />
      <Preview>Sign in Link for Expense.fyi</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded-md my-[40px] mx-auto p-[20px] w-[465px]">
          <Section style={{ marginTop: '20px' }}>
						<Img src={`${logoUrl}`} width="50" height="50" alt="Logo" style={logo} />
					</Section>
          <Text style={{ ...h1, marginTop: '20px', textAlign: 'center' }}>Magic Link</Text>
					<Text style={text}>Hello!</Text>
					<Text style={text}>
						Please click the below link to {btnText} to your account. This link will expire in 10 minutes.
					</Text>

					<Section style={{ textAlign: 'left' }}>
						<ButtonLink href={action_link} btnText={btnText} />
					</Section>
					<Text style={text}>
						or if you are on mobile, copy and paste this URL into your browser:{' '}
						<Link style={{ ...link, display: 'block', marginTop: '15px', color: '#cc35e5' }} rel="nofollow">
							{action_link.replace(/^https?:\/\//, '')}
						</Link>
					</Text>
					<Text style={{ ...text, color: '#666666' }}>
						If you didn{"'"}t try to {btnText}, you can safely ignore this email.
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
	fontWeight: '500',
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