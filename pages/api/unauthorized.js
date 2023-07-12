export default function handle(_, res) {
	res.status(401).json({ message: 'Unauthorized request' });
}
