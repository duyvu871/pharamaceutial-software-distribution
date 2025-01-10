export function withBenchmark<T extends (...args: any[]) => any>(
	fn: T
): (...args: Parameters<T>) => ReturnType<T> {
	return (...args: Parameters<T>): ReturnType<T> => {
		const startTime = performance.now();
		const result = fn(...args);
		const endTime = performance.now();
		const executionTime = endTime - startTime;
		console.log(`Function ${fn.name} executed in ${executionTime.toFixed(4)} milliseconds.`);
		return result;
	};
}

export function benchmarkAsync<T extends (...args: any[]) => Promise<any>>(
	asyncFn: T
): (...args: Parameters<T>) => Promise<Awaited<ReturnType<T>>> {
	return async (...args: Parameters<T>): Promise<Awaited<ReturnType<T>>> => {
		const startTime = performance.now();
		const result = await asyncFn(...args);
		const endTime = performance.now();
		const executionTime = endTime - startTime;
		console.log(`Async function ${asyncFn.name} executed in ${executionTime.toFixed(4)} milliseconds.`);
		return result;
	};
}