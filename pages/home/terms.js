import Head from 'next/head';
import Link from 'next/link';

import Footer from 'components/Footer';
import Logo from 'components/Logo';

export default function Terms() {
	return (
		<>
			<Head>
				<title>Expense.fyi – Terms of use</title>
				<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
			</Head>

			<div
				className={`font-default relative min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-50 pl-2 pr-2 leading-relaxed text-zinc-800`}
			>
				<div className="relative m-auto h-[40px] max-w-4xl pt-3">
					<header className="absolute left-0 right-0 top-3 z-20 flex items-center justify-between">
						<Link href="/" className="flex h-[40px] max-w-[180px] items-center p-3 text-2xl">
							<Logo />
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
				<div className="font-default m-4 mt-4 h-full max-w-3xl pt-3 sm:m-4 sm:mt-8 lg:m-auto">
					<h1 className="mb-6 mt-10 text-center text-3xl font-black leading-[1.15] tracking-[-0.03em] sm:text-4xl sm:leading-[1.15]">
						Terms & Conditions
					</h1>
					<p className="mt-2">
						By downloading or using the app, these terms will automatically apply to you – you should make sure
						therefore that you read them carefully before using the app. You{"'"}re not allowed to copy or modify the
						app, any part of the app, or our trademarks in any way.
					</p>
					<p className="mt-2">
						You{'’'}re not allowed to attempt to extract the source code of the app, and you also shouldn{'’'}t try to
						translate the app into other languages or make derivative versions. The app itself, and all the trademarks,
						copyright, database rights, and other intellectual property rights related to it, still belong to . is
						committed to ensuring that the app is as useful and efficient as possible.
					</p>
					<p className="mt-2">
						For that reason, we reserve the right to make changes to the app or to charge for its services, at any time
						and for any reason. We will never charge you for the app or its services without making it very clear to you
						exactly what you{'’'}re paying for. The Expense.fyi app stores and processes personal data that you have
						provided to us, to provide my Service.{' '}
					</p>
					<p className="mt-2">
						{' '}
						It{"'"}s your responsibility to keep your phone and access to the app secure. We therefore recommend that
						you do not jailbreak or root your phone, which is the process of removing software restrictions and
						limitations imposed by the official operating system of your device. It could make your phone vulnerable to
						malware/viruses/malicious programs, compromise your phone{"'"}s security features and it could mean that the
						Expense.fyi app won{"'"}t work properly or at all. You should be aware that there are certain things that
						will not take responsibility for. Certain functions of the app will require the app to have an active
						internet connection.
					</p>
					<p className="mt-2">
						The connection can be Wi-Fi or provided by your mobile network provider, but cannot take responsibility for
						the app not working at full functionality if you don{"'"}t have access to Wi-Fi, and you don{"'"}t have any
						of your data allowance left. If you{"'"}re using the app outside of an area with Wi-Fi, you should remember
						that the terms of the agreement with your mobile network provider will still apply. As a result, you may be
						charged by your mobile provider for the cost of data for the duration of the connection while accessing the
						app, or other third-party charges. In using the app, you{"'"}re accepting responsibility for any such
						charges, including roaming data charges if you use the app outside of your home territory (i.e. region or
						country) without turning off data roaming. If you are not the bill payer for the device on which you{"'"}re
						using the app, please be aware that we assume that you have received permission from the bill payer for
						using the app.
					</p>
					<p className="mt-2">
						Along the same lines, cannot always take responsibility for the way you use the app i.e. You need to make
						sure that your device stays charged – if it runs out of battery and you can{"'"}t turn it on to avail the
						Service, cannot accept responsibility. With respect to {"'"}s responsibility for your use of the app, when
						you{"'"}re using the app, it{"'"}s important to bear in mind that although we endeavor to ensure that it is
						updated and correct at all times, we do rely on third parties to provide information to us so that we can
						make it available to you. accepts no liability for any loss, direct or indirect, you experience as a result
						of relying wholly on this functionality of the app. At some point, we may wish to update the app. The app is
						currently available on – the requirements for the system(and for any additional systems we decide to extend
						the availability of the app to) may change, and you{"'"}ll need to download the updates if you want to keep
						using the app. does not promise that it will always update the app so that it is relevant to you and/or
						works with the version that you have installed on your device.
					</p>{' '}
					<p className="mt-2">
						However, you promise to always accept updates to the application when offered to you, We may also wish to
						stop providing the app, and may terminate use of it at any time without giving notice of termination to you.
						Unless we tell you otherwise, upon any termination, (a) the rights and licenses granted to you in these
						terms will end; (b) you must stop using the app, and (if needed) delete it from your device.
					</p>
				</div>
				<div className="font-default m-4 mt-4 max-w-3xl pt-3 sm:m-auto">
					<h2 className="mb-3 mt-2 text-2xl font-extrabold leading-6">Changes to This Terms and Conditions</h2>
					<p className="mt-2">
						I may update our Terms and Conditions from time to time. Thus, you are advised to review this page
						periodically for any changes. I will notify you of any changes by posting the new Terms and Conditions on
						this page. These terms and conditions are effective as of 2023-01-01
					</p>
				</div>
				<div className="font-default relative m-4 mt-3 mb-20 max-w-3xl pt-3 sm:m-auto sm:mb-20">
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
		</>
	);
}
