import React from "react";

function AverageTimes({ avgWaitingTime, avgTurnaroundTime }) {
	return (
		<div>
			<h2>Average Times</h2>
			<p>Average Waiting Time: {avgWaitingTime.toFixed(2)}</p>
			<p>Average Turnaround Time: {avgTurnaroundTime.toFixed(2)}</p>
		</div>
	);
}

export default AverageTimes;
