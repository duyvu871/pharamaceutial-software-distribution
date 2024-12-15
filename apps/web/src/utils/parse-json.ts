export const parseJson = <Parsed extends any>(jsonString: string): Parsed | any | null => {
		try {
				return JSON.parse(jsonString);
		} catch (error) {
				console.error(error);
				return null;
		}
}