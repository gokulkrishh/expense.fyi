export default function handle(_, res) {
	return res.status(401).send({ status: 401, message: 'Unauthorized request' });
}
