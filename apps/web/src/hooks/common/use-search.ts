import { useState, useMemo, useCallback } from "react";
import Fuse, {IFuseOptions} from "fuse.js";

type UseSearchOptions<T> = IFuseOptions<T> & {
	keys: Array<keyof T>;
	threshold?: number;
};

export function useSearch<T extends Record<string, string>>
(options: UseSearchOptions<T>) {
	const [query, setQuery] = useState<string>("");
	const [data, setData] = useState([] as T[]);
	const fuse = useMemo(() => {
		return new Fuse<T>(data, {
			keys: options.keys as string[],
			threshold: options.threshold || 0.35,
		});
	}, [data, options.keys, options.threshold]);

	const results = useMemo(() => {
		if (!query) return data;
		return fuse.search(query).map((result) => result.item);
	}, [query, fuse]);

	const queryResults = useCallback((query: string): T[] => {
		const search = fuse.search(query);
		// console.log(search);
		return search.map((result) => result.item);
	}, [fuse]);

	return {
		query: queryResults,
		store: data,
		setQuery,
		results,
		setData
	};
}
