export function calculateAverages(results) {
	const avgWaitingTime =
		results.reduce((sum, p) => sum + p.waitingTime, 0) / results.length;
	const avgTurnaroundTime =
		results.reduce((sum, p) => sum + p.turnaroundTime, 0) / results.length;

	return { avgWaitingTime, avgTurnaroundTime };
}

export function sortProcessesByPriority(processes) {
	return [...processes].sort((a, b) => a.priority - b.priority);
}
