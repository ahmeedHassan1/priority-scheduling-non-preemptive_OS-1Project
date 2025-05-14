import React from "react";
import "./GanttChart.css";

function GanttChart({ processes }) {
	const timeline = [];
	let currentTime = 0;

	for (const process of processes) {
		if (process.arrivalTime > currentTime) {
			timeline.push({
				id: "IDLE",
				startTime: currentTime,
				endTime: process.arrivalTime
			});
			currentTime = process.arrivalTime;
		}

		const startTime = Math.max(currentTime, process.arrivalTime);
		const endTime = startTime + process.burstTime;
		timeline.push({ id: process.id, startTime, endTime });
		currentTime = endTime;
	}

	const totalTime = timeline[timeline.length - 1].endTime;

	return (
		<div className="gantt-chart">
			<h2 style={{ marginBottom: "30px" }}>Gantt Chart</h2>
			<div className="chart-container">
				{timeline.map(({ id, startTime, endTime }, index) => (
					<div
						key={id + "-" + startTime}
						className="chart-block"
						style={{
							flex: (endTime - startTime) / totalTime
						}}>
						{typeof id === "number" ? `P${id}` : id}
					</div>
				))}
			</div>

			<div className="chart-timeline">
				{timeline.map(({ startTime }, index) => (
					<span
						key={startTime}
						className={index % 2 === 0 ? "above" : "below"}
						style={{
							left: `${(startTime / totalTime) * 100}%`
						}}>
						{startTime}
					</span>
				))}
				<span
					className={timeline.length % 2 === 0 ? "above" : "below"}
					style={{
						left: "100%"
					}}>
					{totalTime}
				</span>
			</div>
		</div>
	);
}

export default GanttChart;
