import { ArcElement, Chart as ChartJS, Colors, Filler } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Colors, Filler);

function generateData() {
	return Array(10)
		.fill()
		.map((v, i) => ++i);
}

const chartData = {
	datasets: [
		{
			data: generateData(),
		},
	],
};

function colorize(opaque, hover, ctx) {
	const v = ctx.parsed;
	const c = v < -50 ? '#D60000' : v < 0 ? '#F46300' : v < 50 ? '#0358B6' : '#44DE28';

	const opacity = hover ? 1 - Math.abs(v / 150) - 0.2 : 1 - Math.abs(v / 150);

	return opaque ? c : Utils.transparentize(c, opacity);
}

function hoverColorize(ctx) {
	return colorize(false, true, ctx);
}

const options = {
	type: 'pie',
	options: {
		plugins: {
			legend: false,
			tooltip: false,
		},
	},
};

export default function SubscriptionChart({}) {
	return (
		<div className="w-[300px]">
			<h2 className="mb-4 text-xl">Subscriptions</h2>
			<Doughnut options={options} data={chartData} />
		</div>
	);
}
