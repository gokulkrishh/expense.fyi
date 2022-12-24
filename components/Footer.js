const Footer = (className = '') => {
	return (
		<footer className={`${className} bottom-5 left-0 right-0 m-auto text-center text-sm`}>
			&copy; Expense Tracker {new Date().getFullYear()}
		</footer>
	);
};

export default Footer;
