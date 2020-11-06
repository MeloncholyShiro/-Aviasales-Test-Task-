/* eslint-disable unicorn/consistent-function-scoping */
import { throttle } from '.';

test('Should verify the tests are passing', () => {
	expect(false).toBe(false);
});

test('should work like Throttle function', () => {
	jest.useFakeTimers();

	const fakeFunction = jest.fn();
	const throttledFunction = throttle(fakeFunction, 100);
	throttledFunction();
	expect(fakeFunction).toBeCalled();
	expect(fakeFunction).toBeCalledTimes(1);

	for (let index = 0; index < 11; index++) {
		jest.runTimersToTime(10);
		throttledFunction();
	}

	expect(fakeFunction).toBeCalled();
	expect(fakeFunction).toBeCalledTimes(2);
});

test('should execute only one time', () => {
	jest.useFakeTimers();

	const fakeFunction = jest.fn();
	const throttledFunction = throttle(fakeFunction, 100);
	for (let index = 0; index < 10; index++) {
		jest.runTimersToTime(10);
		throttledFunction();
	}

	expect(fakeFunction).toBeCalledTimes(1);
});

test('should execute only two times without waitMilliseconds argument', () => {
	jest.useFakeTimers();

	const fakeFunction = jest.fn();
	const throttledFunction = throttle(fakeFunction);
	for (let index = 0; index < 10; index++) {
		jest.runTimersToTime(index + 1);
		throttledFunction();
	}

	expect(fakeFunction).toBeCalledTimes(2);
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

	const throttledFunction = throttle(fakeFunction, 2000);

	const testContextAnonymousFakeFunction = jest.fn(() => fakeContext);

	const testContextFakeFunction = jest.fn(function test() {
		return fakeContext.testing() as unknown;
	});

	const testContextAnonymous = throttle(testContextAnonymousFakeFunction, 2000);

	const testContext = throttle(testContextFakeFunction, 2000);

	for (let index = 0; index < 5; index++) {
		jest.runTimersToTime(1000);
		throttledFunction();
	}

	expect(fakeFunction).toBeCalled();
	expect(fakeFunction).toBeCalledTimes(3);

	for (let index = 0; index < 10; index++) {
		jest.runTimersToTime(500);
		testContextAnonymous();
	}

	expect(testContextAnonymousFakeFunction).toBeCalled();
	expect(testContextAnonymousFakeFunction).toBeCalledTimes(3);
	expect(testContextAnonymousFakeFunction).toReturnWith(fakeContext);

	for (let index = 0; index < 20; index++) {
		jest.runTimersToTime(250);
		testContext();
	}

	expect(testContextFakeFunction).toBeCalled();
	expect(testContextFakeFunction).toBeCalledTimes(3);
	expect(testContextFakeFunction).toReturnWith(fakeContext);
});

test('should called with arguments', () => {
	jest.useFakeTimers();
	const calculate = (a: number, b: number) => a + b;

	const testFunction = jest.fn(calculate);

	const throttledFunction = throttle(testFunction, 1000);
	throttledFunction(114, 114);

	expect(testFunction).toBeCalled();
	expect(testFunction).toBeCalledTimes(1);
	expect(testFunction).toBeCalledWith(114, 114);
	expect(testFunction).toReturnWith(228);

	for (let index = 0; index < 10; index++) {
		jest.runTimersToTime(200);
		throttledFunction(114, 114);
	}

	expect(testFunction).toBeCalled();
	expect(testFunction).toBeCalledTimes(3);
	expect(testFunction).toBeCalledWith(114, 114);
	expect(testFunction).toReturnWith(228);
});

test('should return last called arguments', () => {
	jest.useFakeTimers();
	const calculate = (a: number, b: number) => a + b;

	const testFunction = jest.fn(calculate);

	const throttledFunction = throttle(testFunction, 1000);
	throttledFunction(114, 114);

	expect(testFunction).toBeCalled();
	expect(testFunction).toBeCalledTimes(1);
	expect(testFunction).toBeCalledWith(114, 114);
	expect(testFunction).toReturnWith(228);

	for (let index = 0; index < 3; index++) {
		jest.runTimersToTime(800);
		throttledFunction(114 + index, 114 + index);
	}

	expect(testFunction).toBeCalled();
	expect(testFunction).toBeCalledTimes(3);
	expect(testFunction).lastCalledWith(115, 115);
	expect(testFunction).lastReturnedWith(230);
});
