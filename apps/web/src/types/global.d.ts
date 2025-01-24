declare global {
	type Await<T> = T extends {
		then(onfulfilled?: (value: infer U) => unknown): unknown;
	} ? U : T;
	type ExcludeProperties<U, T extends keyof U> = {
		[K in keyof U as K extends T ? never : K]: U[K];
	};
	type Merge<A, B> = ({ [K in keyof A]: K extends keyof B ? B[K] : A[K] } &
		B) extends infer O
		? { [K in keyof O]: O[K] }
		: never;
	type NullableProperties<T> = {
		[K in keyof T]: T[K] | null;
	}
	type OptionalProperties<T> = {
		[K in keyof T]?: T[K];
	}
}

export {};