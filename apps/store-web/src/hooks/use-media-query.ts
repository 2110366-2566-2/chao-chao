import { useLayoutEffect, useState } from "react";

export function useMediaQuery(query: string) {
	const [value, setValue] = useState(() => window.matchMedia(query).matches);

	useLayoutEffect(() => {
		function onChange(event: MediaQueryListEvent) {
			setValue(event.matches);
		}

		const result = window.matchMedia(query);
		result.addEventListener("change", onChange);
		setValue(result.matches);

		return () => {
			result.removeEventListener("change", onChange);
		};
	}, [query]);

	return value;
}