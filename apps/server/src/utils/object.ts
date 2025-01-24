type AnyObject = Record<any, any>;

export function extractProperties<T extends AnyObject>(originalObject: T, propertiesToExtract: (keyof T)[]): Pick<T, (keyof T)> {
	const extractedObject: Pick<T, keyof T> = {} as Pick<T, keyof T>;

	propertiesToExtract.forEach(property => {
		if (Object.prototype.hasOwnProperty.call(originalObject, property)) {
			extractedObject[property] = originalObject[property];
		}
	});

	return extractedObject;
}

export function removeUndefinedProperties<T extends AnyObject>(object: T): T {
	const cleanedObject: T = {} as T;

	Object.keys(object).forEach(key => {
		if (object[key] !== undefined) {
			// @ts-ignore
			cleanedObject[key] = object[key];
		}
	});

	return cleanedObject;
}


export function omitProperties<T extends Record<string, any>, K extends keyof T>(
	object: T,
	propertiesToOmit: K[]
): Omit<T, K> {
	const omittedObject: Record<string, any> = {}; // Declare with index signature and any type

	for (const key of Object.keys(object)) {
		if (
			Object.prototype.hasOwnProperty.call(object, key) &&
			!propertiesToOmit.includes(key as K)
		) {
			omittedObject[key] = object[key]; // Assign using key as string
		}
	}

	return omittedObject as Omit<T, K>; // Cast to the expected return type
}