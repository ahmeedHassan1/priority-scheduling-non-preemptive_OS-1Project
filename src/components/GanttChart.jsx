import React from "react";
import "./GanttChart.css";

function GanttChart({ processes }) {
	const totalTime = processes.reduce(
		(sum, process) => sum + process.burstTime,
		0
	);

	const timeline = processes.reduce((acc, process, index) => {
		const startTime = index === 0 ? 0 : acc[index - 1].endTime;
		const endTime = startTime + process.burstTime;
		acc.push({ startTime, endTime });
		return acc;
	}, []);

	return (
		<div className="gantt-chart">
			<h2 style={{ marginBottom: "30px" }}>Gantt Chart</h2>
			<div className="chart-container">
				{processes.map((process) => (
					<div
						key={process.id}
						className="chart-block"
						style={{ flex: process.burstTime / totalTime }}>
						P{process.id}
					</div>
				))}
			</div>
			<div className="chart-timeline">
				{timeline.map((time, index) => (
					<span
						key={time.startTime}
						className={index % 2 === 0 ? "above" : "below"}
						style={{
							position: "absolute",
							left: `${(time.startTime / totalTime) * 100}%`,
							transform: "translateX(-50%)"
						}}>
						{time.startTime}
					</span>
				))}
				<span
					className={timeline.length % 2 === 0 ? "above" : "below"}
					style={{
						position: "absolute",
						left: "100%",
						transform: "translateX(-50%)"
					}}>
					{totalTime}
				</span>
			</div>
		</div>
	);
}

export default GanttChart;
