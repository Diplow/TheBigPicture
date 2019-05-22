import React from 'react'
import Chart from 'react-google-charts'


export const FullStackedBarChart = ({ data }) => {
	const options = {
		legend: { position: 'top', maxLines: 5 },
		bar: { groupWidth: '35%' },
		isStacked: 'percent',
		series: {
			0: { color: "#C6C6C6" },
			1: { color: "#F46333" },
			2: { color: "#EA9D2A" },
			3: { color: "#FFCB49" },
			4: { color: "#BEEE62" },
			5: { color: "#70AE6E" },
		}
	};

	return (
		<Chart
          chartType="BarChart"
          data={data}
          options={options}
          width="100%"
          height="400px"
        />
	);
}
