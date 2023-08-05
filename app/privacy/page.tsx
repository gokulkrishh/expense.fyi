import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import logo from 'public/icons/logo.svg';

import Footer from 'components/footer';

export default function Privacy() {
	return (
		<div className="relative min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-50 pl-2 pr-2 leading-relaxed text-zinc-800">
			<div className="relative m-auto h-[40px] max-w-4xl pt-3">
				<header className="absolute left-0 right-0 top-3 z-20 flex items-center justify-between">
					<Link href="/" className="flex h-[40px] max-w-[180px] items-center p-3 text-2xl">
						<Image src={logo} width={30} height={30} alt="expense.fyi logo" className="mr-2" />
						<span className="font-black tracking-[-0.03em] text-gray-900">Expense.fyi</span>
					</Link>
				</header>
			</div>
			<div className="absolute inset-x-0 top-0 z-10 h-40 overflow-hidden text-slate-600/40 opacity-10 [mask-image:linear-gradient(to_top,transparent,white)]">
				<div className="">
					<svg className="absolute inset-0 top-0 h-full w-full text-gray-800" xmlns="http://www.w3.org/2000/svg">
						<defs>
							<pattern
								id="pricing-pattern"
								width="32"
								height="32"
								patternUnits="userSpaceOnUse"
								x="50%"
								y="100%"
								patternTransform="translate(0 -1)"
							>
								<path d="M0 32V.5H32" fill="none" stroke="currentColor"></path>
							</pattern>
						</defs>
						<rect width="100%" height="100%" fill="url(#pricing-pattern)"></rect>
					</svg>
				</div>
			</div>
			<div className="m-4 mt-4 max-w-3xl pt-3 sm:m-4 sm:mt-8 lg:m-auto">
				<h1 className="mb-6 mt-10 text-center text-3xl font-black leading-[1.15] tracking-[-0.03em] sm:text-4xl sm:leading-[1.15]">
					Privacy Policy
				</h1>
				<p className="mt-2">
					Author built the <b>Expense.fyi</b> web application as a <b>Freemium app</b>. This SERVICE is provided by at
					no cost and is intended for use as is.
				</p>
				<p className="mt-2">
					This page is used to inform visitors regarding my policies with the collection, use, and disclosure of
					Personal Information if anyone decided to use my Service.
				</p>
				<p className="mt-2">
					If you choose to use my Service, then you agree to the collection and use of information in relation to this
					policy. The Personal Information that I collect is used for providing and improving the Service. I will not
					use or share your information with anyone except as described in this Privacy Policy.
				</p>
				<p className="mt-2">
					The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which are
					accessible at Expense.fyi unless otherwise defined in this Privacy Policy.
				</p>
			</div>
			<div className="relative m-4 mt-3 max-w-3xl pt-3 sm:m-4 lg:m-auto">
				<h2 className="mb-3 mt-2 text-2xl font-extrabold leading-6">Information Collection and Use</h2>
				<p className="mt-2">
					For a better experience, while using our Service, I may require you to provide us with certain personally
					identifiable information. The information that I request will be retained on your device and is not collected
					by me in any way.
				</p>
			</div>
			<div className="relative m-4 mt-3 max-w-3xl pt-3 sm:m-4 lg:m-auto">
				<h2 className="mb-3 mt-2 text-2xl font-extrabold leading-6">Log Data</h2>
				<p className="mt-2">
					I want to inform you that whenever you use my Service, in a case of an error in the app I collect data and
					information (through third-party products) on your phone called Log Data.
				</p>
				<p className="mt-2">
					This Log Data may include information such as your device Internet Protocol (“IP”) address, device name,
					operating system version, the configuration of the app when utilizing my Service, the time and date of your
					use of the Service, and other statistics.
				</p>
			</div>
			<div className="relative m-4 mt-3 max-w-3xl pt-3 sm:m-4 lg:m-auto">
				<h2 className="mb-3 mt-2 text-2xl font-extrabold leading-6">Cookies</h2>
				<p className="mt-2">
					Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These
					are sent to your browser from the websites that you visit and are stored on your device{"'"}s internal memory.
				</p>
				<p className="mt-2">
					This Service does not use these “cookies” explicitly. However, the app may use third-party code and libraries
					that use “cookies” to collect information and improve their services. You have the option to either accept or
					refuse these cookies and know when a cookie is being sent to your device. If you choose to refuse our cookies,
					you may not be able to use some portions of this Service.
				</p>
			</div>
			<div className="relative m-4 mt-3 max-w-3xl pt-3 sm:m-4 lg:m-auto">
				<h2 className="mb-3 mt-2 text-2xl font-extrabold leading-6">Service Providers</h2>
				<p className="mt-2">I may employ third-party companies and individuals due to the following reasons:</p>
				<ul className="mt-4 list-disc pl-6">
					<li className="pb-2">To facilitate our Service;</li>
					<li className="pb-2">To provide the Service on our behalf;</li>
					<li className="pb-2">To perform Service-related services; or</li>
					<li className="pb-2">To assist us in analyzing how our Service is used.</li>
				</ul>
				<p className="mt-2">
					I want to inform users of this Service that these third parties have access to their Personal Information. The
					reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or
					use the information for any other purpose.
				</p>
			</div>
			<div className="relative m-4 mt-3 max-w-3xl pt-3 sm:m-4 lg:m-auto">
				<h2 className="mb-3 mt-2 text-2xl font-extrabold leading-6">Security</h2>
				<p className="mt-2">
					I value your trust in providing us your Personal Information, thus we are striving to use commercially
					acceptable means of protecting it. But remember that no method of transmission over the internet, or method of
					electronic storage is 100% secure and reliable, and I cannot guarantee its absolute security.
				</p>
			</div>
			<div className="relative m-4 mt-3 max-w-3xl pt-3 sm:m-4 lg:m-auto">
				<h2 className="mb-3 mt-2 text-2xl font-extrabold leading-6">Links to Other Sites</h2>
				<p className="mt-2">
					This Service may contain links to other sites. If you click on a third-party link, you will be directed to
					that site. Note that these external sites are not operated by me.
				</p>
				<p className="mt-2">
					Therefore, I strongly advise you to review the Privacy Policy of these websites. I have no control over and
					assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
				</p>
			</div>
			<div className="relative m-4 mt-3 max-w-3xl pt-3 sm:m-4 lg:m-auto">
				<h2 className="mb-3 mt-2 text-2xl font-extrabold leading-6">Children{"'"}s Privacy</h2>
				<p className="mt-2">
					I do not knowingly collect personally identifiable information from children. I encourage all children to
					never submit any personally identifiable information through the Application and/or Services.
				</p>
				<p className="mt-2">
					I encourage parents and legal guardians to monitor their children{"'"}s Internet usage and to help enforce
					this Policy by instructing their children never to provide personally identifiable information through the
					Application and/or Services without their permission. If you have reason to believe that a child has provided
					personally identifiable information to us through the Application and/or Services, please contact us.
				</p>
				<p className="mt-2">
					You must also be at least 16 years of age to consent to the processing of your personally identifiable
					information in your country (in some countries we may allow your parent or guardian to do so on your behalf).
				</p>
			</div>
			<div className="relative m-4 mt-3 max-w-3xl pt-3 sm:m-4 lg:m-auto">
				<h2 className="mb-3 mt-2 text-2xl font-extrabold leading-6">Changes to This Privacy Policy</h2>
				<p className="mt-2">
					I may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for
					any changes. I will notify you of any changes by posting the new Privacy Policy on this page. This policy is
					effective as of 2023-01-01
				</p>
			</div>
			<div className="relative m-4 mb-10 mt-3 max-w-3xl pt-3 sm:m-4 sm:mb-10 lg:m-auto lg:mb-10">
				<h2 className="mb-3 mt-2 text-2xl font-extrabold leading-6">Contact Us</h2>
				<p className="mt-2">
					If you have any questions or suggestions about my Privacy Policy, do not hesitate to contact me at{' '}
					<a className="border-b-[1px] border-black pb-[1px]" href="mailto:hello@expense.fyi.">
						hello@expense.fyi.
					</a>
				</p>
			</div>
			<Footer />
		</div>
	);
}
