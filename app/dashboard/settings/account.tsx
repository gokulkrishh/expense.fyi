'use client';

import { useUser } from 'components/context/auth-provider';
import { Card, CardContent, CardHeader } from 'components/ui/card';
import { Input } from 'components/ui/input';
import { Label } from 'components/ui/label';
import { ScrollArea } from 'components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'components/ui/select';

import data from 'data/currency.json';

export default function Account() {
	const user = useUser();
	return (
		<Card className="w-full">
			<CardHeader>
				<h2 className="font-semibold text-primary dark:text-white">Account</h2>
			</CardHeader>
			<CardContent>
				<div className="grid gap-6 sm:grid-cols-2">
					<div>
						<Label className="mb-3 block" htmlFor="email">
							Email
						</Label>
						<Input id="email" disabled defaultValue={user.email} />
					</div>
					<div>
						<Label className="mb-3 block" htmlFor="currency">
							Currency
						</Label>
						<Select>
							<SelectTrigger className="w-full">
								<SelectValue id="currency" placeholder="Select your currency" />
							</SelectTrigger>
							<SelectContent>
								<ScrollArea className="h-[250px] max-w-[300px]">
									{Object.keys(data).map((key: string) => {
										const { languages = [], currency } = data[key as keyof typeof data];
										const [currencyCode] = currency;
										return languages.map((language: any) => (
											<SelectItem
												className="w-full"
												key={`${currencyCode}-${language}`}
												value={`${currencyCode}-${language}`}
											>
												{data[key as keyof typeof data].name} - {language}
											</SelectItem>
										));
									})}
								</ScrollArea>
							</SelectContent>
						</Select>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
