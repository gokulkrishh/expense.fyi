import { useEffect } from 'react';

export default function useEsc({ hideModal = () => {} }) {
	useEffect(() => {
		const close = (e) => {
			if (e.keyCode === 27) {
				hideModal();
			}
		};
		window.addEventListener('keydown', close);
		return () => window.removeEventListener('keydown', close);
	}, [hideModal]);
}
