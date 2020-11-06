/* eslint-disable unicorn/consistent-function-scoping */
import { debounce } from '.';

test('Should verify the tests are passing', () => {
	expect(false).toBe(false);
});

test('should work like Debounce function', () => {
	jest.useFakeTimers();

	const fakeFunction = jest.fn();
	const debouncedFunction = debounce(fakeFunction, 100);

	debouncedFunction();
	expect(fakeFunction).not.toBeCalled();

	jest.runTimersToTime(50);
	expect(fakeFunction).not.toBeCalled();

	jest.runTimersToTime(100);
	expect(fakeFunction).toBeCalled();
	expect(fakeFunction).toBeCalledTimes(1);
});

test('should work with isImmediate', () => {
	jest.useFakeTimers();

	const fakeFunction = jest.fn();
	const debouncedFunction = debounce(fakeFunction, 100, { isImmediate: true });

	debouncedFunction();
	expect(fakeFunction).toBeCalled();
	expect(fakeFunction).toBeCalledTimes(1);

	jest.runTimersToTime(50);
	expect(fakeFunction).toBeCalledTimes(1);

	jest.runTimersToTime(100);
	expect(fakeFunction).toBeCalledTimes(1);
});

test('should execute only one time', () => {
	jest.useFakeTimers();

	const fakeFunction = jest.fn();
	const debouncedFunction = debounce(fakeFunction, 100);
	for (let index = 0; index < 100; index++) {
		jest.runTimersToTime(50);
		debouncedFunction();
	}
	expect(fakeFunction).not.toBeCalled();

	jest.runTimersToTime(100);

	expect(fakeFunction).toBeCalledTimes(1);
});

test('should execute only one time without waitMilliseconds argument', () => {
	jest.useFakeTimers();

	const fakeFunction = jest.fn();
	const debouncedFunction = debounce(fakeFunction);
	for (let index = 0; index < 100; index++) {
		jest.runTimersToTime(10);
		debouncedFunction();
	}
	expect(fakeFunction).not.toBeCalled();

	jest.runTimersToTime(50);

	expect(fakeFunction).toBeCalledTimes(1);
});

test('should not lose this', () => {
	jest.useFakeTimers();

	const fakeContext = {
		Hello: '1',
		ItsMe: '2',
		MARIO: '3',
		testing: jest.fn().mockReturnThis(),
	};

	const fakeFunction = jest.fn();

	const debouncedFunction = debounce(fakeFunction);
	debouncedFunction();

	const testContextAnonymousFakeFunction = jest.fn(() => fakeContext);

	const testContextFakeFunction = jest.fn(function test() {
		return fakeContext.testing() as unknown;
	});

	const testContextAnonymous = debounce(testContextAnonymousFakeFunction, 1337, { isImmediate: true });
	testContextAnonymous();

	const testContext = debounce(testContextFakeFunction, 1337, { isImmediate: true });
	testContext();

	expect(testContextAnonymousFakeFunction).toBeCalled();
	expect(testContextAnonymousFakeFunction).toBeCalledTimes(1);
	expect(testContextAnonymousFakeFunction).toReturnWith(fakeContext);

	expect(testContextFakeFunction).toBeCalled();
	expect(testContextFakeFunction).toBeCalledTimes(1);
	expect(testContextFakeFunction).toReturnWith(fakeContext);

	jest.runTimersToTime(2000);
	expect(fakeFunction).toBeCalledTimes(1);
});

test('should called with arguments', () => {
	const calculate = (a: number, b: number) => a + b;

	const testFunction = jest.fn(calculate);

	const debouncedFunction = debounce(testFunction, Infinity, { isImmediate: true });
	debouncedFunction(114, 114);

	expect(testFunction).toBeCalled();
	expect(testFunction).toBeCalledTimes(1);
	expect(testFunction).toBeCalledWith(114, 114);
	expect(testFunction).toReturnWith(228);
});
