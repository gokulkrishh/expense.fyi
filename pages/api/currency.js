import currency from 'data/currency.json';

export default function handler(_, res) {
	res.status(200).json(currency);
}
