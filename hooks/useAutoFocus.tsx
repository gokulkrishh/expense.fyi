import { useEffect, useRef } from 'react';

const useAutoFocus = (): any => {
	const inputRef = useRef<HTMLElement>(null);

	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	return inputRef;
};

export default useAutoFocus;
