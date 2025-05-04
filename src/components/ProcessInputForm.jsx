import React from "react";
import { toast } from "react-toastify";

function ProcessInputForm({ processes, setProcesses, calculateScheduling }) {
	const handleInputChange = (index, field, value) => {
		const updatedProcesses = [...processes];
		updatedProcesses[index][field] = parseInt(value, 10) || 0;
		setProcesses(updatedProcesses);
	};

	const handleCalculateClick = (e) => {
		e.preventDefault();
		const hasInvalidValues = processes.some(
			(process) =>
				process.arrivalTime < 0 || process.burstTime < 0 || process.priority < 0
		);

		if (hasInvalidValues) {
			toast.error("All values must be 0 or greater.");
			return;
		}

		calculateScheduling();
	};

	return (
		<form onSubmit={handleCalculateClick}>
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
			<button style={{ marginTop: "20px" }} type="submit">
				Calculate
			</button>
		</form>
	);
}

export default ProcessInputForm;
