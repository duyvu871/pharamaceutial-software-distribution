declare global {
	type Await<T> = T extends {
		then(onfulfilled?: (value: infer U) => unknown): unknown;
	} ? U : T;
	type ExcludeProperties<U, T extends keyof U> = {
		[K in keyof U as K extends T ? never : K]: U[K];
	};
}

export {};