import { currying } from '.';

test('Should verify the tests are passing', () => {
	expect(false).toBe(false);
});

describe('Curry function generator', () => {
	test('should return a function', () => {
		const someFunction = jest.fn();
		expect(currying(someFunction)).toBeInstanceOf(Function);
	});
});

const someCounterFunction = (a: number, b: number, c: number, d: number) => {
	return a + b + c + d;
};

describe('Curry function', () => {
	test('should return the proper result if called with original number of arguments', () => {
		const curryingCounter = currying(someCounterFunction);
		expect(curryingCounter(1, 2, 3, 4)).toBe(10);
	});

	test('should return the curried function when arguments count is less than the original number of arguments', () => {
		const curryingCounter = currying(someCounterFunction);
		expect(curryingCounter(1, 2, 3)).toBeInstanceOf(Function);
	});

	test('should work like curry function', () => {
		const curryingCounter = currying(someCounterFunction);
		expect(curryingCounter(1)(2)(3)(4)).toBe(10);
		expect(curryingCounter(1, 2)(3, 4)).toBe(10);
		expect(curryingCounter(1)(2, 3)(4)).toBe(10);
		expect(curryingCounter(1, 2, 3, 4)).toBe(10);
	});

	test('should support creating multiple curry functions', () => {
		const curryingCounterA = currying(someCounterFunction);
		const curryingCounterB = currying(someCounterFunction);

		expect(curryingCounterA(1, 2)(3, 4)).toBe(10);
		expect(curryingCounterA(1)(2)(3)).toBeInstanceOf(Function);

		expect(curryingCounterB(1, 2)(3, 4)).toBe(10);
		expect(curryingCounterB(1, 2)(3)).toBeInstanceOf(Function);
	});
});
