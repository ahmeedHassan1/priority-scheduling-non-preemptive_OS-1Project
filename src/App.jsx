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
		const processesCopy = [...processes];
		const completed = [];
		let currentTime = 0;
	
		while (completed.length < processesCopy.length) {
			const available = processesCopy
				.filter(p => p.arrivalTime <= currentTime && !p.completed)
				.sort((a, b) => a.priority - b.priority);
			if (available.length === 0) {
				currentTime++;
				continue;
			}
	
			const currentProcess = available[0];
			const waitingTime = currentTime - currentProcess.arrivalTime;
			const turnaroundTime = waitingTime + currentProcess.burstTime;
	
			completed.push({
				...currentProcess,
				startTime: currentTime,
				waitingTime,
				turnaroundTime,
				finishTime: currentTime + currentProcess.burstTime,
			});
	
			currentProcess.completed = true;
			currentTime += currentProcess.burstTime;
		}
	
		const { avgWaitingTime, avgTurnaroundTime } = calculateAverages(completed);
	
		setResults({
			results: completed,
			avgWaitingTime,
			avgTurnaroundTime,
		});
	
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
					setProcesses={setProcesses}
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
