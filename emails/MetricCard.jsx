export const MetricCard = ({ title, data }) => (
	<div style={cardStyle} className="relative rounded-lg bg-white p-4 text-left">
		<h3 className="mb-0 mt-0 text-xs font-semibold uppercase text-zinc-500">{title}</h3>
		<p class="mb-0 mt-1 text-2xl font-extrabold text-zinc-900">{data}</p>
	</div>
);

export default MetricCard;

const cardStyle = {
	fontFamily:
		"ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
	marginBottom: '20px',
	border: '1px solid #eaeaea',
};
