import Razorpay from 'razorpay';
import shortid from 'shortid';

export default async function handle(req, res) {
	if (req.method === 'POST') {
		const { amount, currency } = req.body;

		const razorpay = new Razorpay({
			key_id: process.env.RAZORPAY_KEY_ID,
			key_secret: process.env.RAZORPAY_SECRET,
		});

		const options = { amount: amount * 100, currency, receipt: shortid.generate(), payment_capture: 1 };

		try {
			const response = await razorpay.orders.create(options);
			res.status(200).json({ id: response.id, currency: response.currency, amount: response.amount });
		} catch (error) {
			res.status(400).json({ error, messgage: 'Payment failed, please try again.' });
		}
	} else {
		res.setHeader('Allow', ['POST']);
		return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
	}
}
