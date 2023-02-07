import { showToast } from 'components/Toast';

import { exportTableToCsv } from 'utils/export';

const excludedColumns = { actions: true };

const ExportButton = ({ className = '', filename }) => {
	return (
		<button
			className={`font-xs inline-flex items-center border border-gray-300 bg-white px-[8px] py-[6px] text-sm font-medium text-black shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 ${className}`}
			onClick={() => {
				showToast('Export will begin shortly.');
				exportTableToCsv(filename, excludedColumns);
			}}
		>
			<svg
				className="mr-1 mt-[0px] h-4 w-4 text-black"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				strokeWidth="2"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
				></path>
			</svg>
			Export to CSV
		</button>
	);
};

export default ExportButton;
