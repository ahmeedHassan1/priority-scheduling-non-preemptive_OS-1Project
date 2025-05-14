import React from "react";

function ResultsTable({ results }) {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column"
			}}>
			<h2>Results</h2>
			<table>
				<thead>
					<tr>
						<th>Process</th>
						<th>Waiting Time</th>
						<th>Turnaround Time</th>
						<th>Arrival Time</th>
						<th>Burst Time</th>
						<th>Priority</th>
					</tr>
				</thead>
				<tbody>
					{results.map((process) => (
						<tr key={process.id}>
							<td>{process.id}</td>
							<td>{process.waitingTime}</td>
							<td>{process.turnaroundTime}</td>
							<td>{process.arrivalTime}</td>
							<td>{process.burstTime}</td>
							<td>{process.priority}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default ResultsTable;
