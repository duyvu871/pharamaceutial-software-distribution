export const calculateEndDate = (startDate: Date, duration: number): Date => {
	return new Date(startDate.getTime() + duration);
}

export const calculateEndDateByDay = (startDate: Date, duration: number): Date => {
	return new Date(startDate.getTime() + duration * 24 * 60 * 60 * 1000);
}