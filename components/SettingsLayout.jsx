import { useState } from 'react';

export default function SettingsLayout({ children }) {
	return <div className="m-auto flex w-full max-w-2xl flex-col items-center justify-center">{children}</div>;
}
