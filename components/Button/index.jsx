import Loader from 'components/Loader';

export default function Button({ loading, text, type = 'button', disabled }) {
	return (
		<button
			type={type}
			disabled={loading || disabled}
			className="mt-0 flex h-[44px] items-center justify-center rounded-md bg-zinc-900 py-2.5 px-4 text-white hover:bg-zinc-700"
		>
			{loading ? <Loader /> : text}
		</button>
	);
}
