/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */

type SameLength<T extends unknown[]> = Extract<{ [K in keyof T]: unknown }, unknown[]>;

type Curried<A extends unknown[], R> = <P extends Partial<A>>(
	...curryingArguments: P
) => P extends A ? R : A extends [...SameLength<P>, ...infer S] ? (S extends unknown[] ? Curried<S, R> : never) : never;

type TCurrying = <A extends unknown[], R>(functionToCurry: (...curryingArguments: A) => R) => Curried<A, R>;

export const currying: TCurrying = functionToCurry => {
	const curried = (...curryingArguments: unknown[]): any => {
		if (curryingArguments.length >= functionToCurry.length) {
			const nextArguments: any = curryingArguments;
			return functionToCurry(...nextArguments);
		}
		return (...nextCurryingArguments: unknown[]): any => {
			const mergedArguments: any = curryingArguments.concat(nextCurryingArguments);
			return curried(...mergedArguments);
		};
	};
	return curried;
};
