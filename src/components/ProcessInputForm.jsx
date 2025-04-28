import React from "react";

function ProcessInputForm({
	processes,
	handleInputChange,
	calculateScheduling
}) {
	return (
		<div>
			<h2>Enter Process Details</h2>
			{processes.map((process, index) => (
				<div key={process.id}>
					<label>Process {process.id}:</label>
					<input
						type="number"
						placeholder="Arrival Time"
						onChange={(e) =>
							handleInputChange(index, "arrivalTime", e.target.value)
						}
					/>
					<input
						type="number"
						placeholder="Burst Time"
						onChange={(e) =>
							handleInputChange(index, "burstTime", e.target.value)
						}
					/>
					<input
					
						type="number"
						placeholder="Priority"
						onChange={(e) =>
							handleInputChange(index, "priority", e.target.value)
						}
					/>
				</div>
			))}
			<button style={{ marginTop: "20px" }} onClick={calculateScheduling}>Calculate</button>
		</div>
	);
}

export default ProcessInputForm;
