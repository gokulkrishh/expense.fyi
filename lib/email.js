import { Resend } from 'resend';

const resend = new Resend(process.env.RESENT_API_KEY);

export default resend;
