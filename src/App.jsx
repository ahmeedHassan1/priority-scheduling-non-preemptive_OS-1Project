import { useState } from "react";
import GanttChart from "./components/GanttChart";
import ProcessInputForm from "./components/ProcessInputForm";
import ResultsTable from "./components/ResultsTable";
import AverageTimes from "./components/AverageTimes";
import { calculateAverages, sortProcessesByPriority } from "./utils";
import { toast } from "react-toastify";
import "./App.css";

function App() {
	const [processes, setProcesses] = useState([]);
	const [numProcesses, setNumProcesses] = useState(0);
	const [results, setResults] = useState(null);

	const handleAddProcesses = (e) => {
		e.preventDefault();
		const newProcesses = Array.from({ length: numProcesses }, (_, i) => ({
			id: i + 1,
			arrivalTime: 0,
			burstTime: 0,
			priority: 0
		}));
		setProcesses(newProcesses);
	};

	const calculateScheduling = () => {
		const sortedProcesses = sortProcessesByPriority(processes);
		let currentTime = 0;
		const results = sortedProcesses.map((process) => {
			const waitingTime = Math.max(0, currentTime - process.arrivalTime);
			const turnaroundTime = waitingTime + process.burstTime;
			currentTime += process.burstTime;
			return { ...process, waitingTime, turnaroundTime };
		});

		const { avgWaitingTime, avgTurnaroundTime } = calculateAverages(results);

		setResults({ results, avgWaitingTime, avgTurnaroundTime });

		toast.success("Scheduling calculations completed successfully!");
	};

	return (
		<div className="App">
			<h1>Priority Scheduling (Non-Preemptive)</h1>
			<form onSubmit={handleAddProcesses}>
				<label>
					Number of Processes:
					<input
						type="number"
						value={numProcesses}
						onChange={(e) => setNumProcesses(parseInt(e.target.value) || 0)}
					/>
				</label>
				<button type="submit">Add Processes</button>
			</form>
			{processes.length > 0 && (
				<ProcessInputForm
					processes={processes}
					calculateScheduling={calculateScheduling}
				/>
			)}
			{results && (
				<div>
					<ResultsTable results={results.results} />
					<AverageTimes
						avgWaitingTime={results.avgWaitingTime}
						setProcesses={setProcesses}
						avgTurnaroundTime={results.avgTurnaroundTime}
					/>
					<GanttChart processes={results.results} />
				</div>
			)}
		</div>
	);
}

export default App;
