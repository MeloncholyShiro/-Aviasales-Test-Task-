// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Procedure = (...functionArguments: any[]) => void;

type Options = {
	isImmediate?: boolean;
};

type DebouncedFunction<F extends Procedure> = (...functionArguments: Parameters<F>) => void;

export const debounce = <F extends Procedure>(
	functionToDebounce: F,
	waitMilliseconds = 50,
	options: Options = {},
): DebouncedFunction<F> => {
	let timeoutId: ReturnType<typeof setTimeout> | undefined;

	return (...functionArguments: Parameters<F>) => {
		const doLater = () => {
			timeoutId = undefined;
			if (!options?.isImmediate) {
				functionToDebounce(...functionArguments);
			}
		};

		const shouldCallNow = options?.isImmediate && timeoutId === undefined;

		if (timeoutId !== undefined) clearTimeout(timeoutId);

		timeoutId = setTimeout(doLater, waitMilliseconds);

		if (shouldCallNow) functionToDebounce(...functionArguments);
	};
};
