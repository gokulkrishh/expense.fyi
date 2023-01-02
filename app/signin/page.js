import { ClockIcon } from '@heroicons/react/24/solid';

import configs from 'app/defaults';
import Form from './form';

export default function Page() {
	return (
		<>
			<div className='flex max-w-md flex-1 flex-col p-10'>
				<h1 className='mb-8 flex items-center text-3xl text-slate-700'>
					<ClockIcon className='mr-2 h-8 w-8 text-slate-700' />
					<span>{configs.title}</span>
				</h1>
				<Form />
			</div>
		</>
	);
}
