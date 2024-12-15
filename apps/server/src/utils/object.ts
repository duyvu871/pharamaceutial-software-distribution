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