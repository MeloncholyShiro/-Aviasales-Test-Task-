// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Procedure = (...functionArguments: any[]) => void;

type ThrottledFunction<F extends Procedure> = (...functionArguments: Parameters<F>) => void;

export const throttle = <F extends Procedure>(
	functionToThrottle: F,
	limitInMilliseconds = 50,
): ThrottledFunction<F> => {
	let isThrottled = false;
	let savedArguments: Parameters<F> | undefined;

	const throttledFunction = (...functionArguments: Parameters<F>) => {
		if (isThrottled) {
			savedArguments = functionArguments;
		} else {
			functionToThrottle(...functionArguments);
			isThrottled = true;
			setTimeout(() => {
				isThrottled = false;
				if (savedArguments) {
					throttledFunction(...savedArguments);
					savedArguments = undefined;
				}
			}, limitInMilliseconds);
		}
	};

	return throttledFunction;
};
