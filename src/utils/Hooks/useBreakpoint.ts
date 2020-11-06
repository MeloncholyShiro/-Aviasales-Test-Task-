import { useEffect, useMemo, useState } from 'react';
import { throttle } from '../Throttle';

const useWindowWidth = (): number => {
	const [width, setWidth] = useState(document.documentElement.clientWidth);

	useEffect(() => {
		const handler = throttle(() => setWidth(document.documentElement.clientWidth), 180);
		window.addEventListener('resize', handler);
		return () => window.removeEventListener('resize', handler);
	}, []);

	return width;
};

export const useBreakpointUp = (breakpoint: number): boolean => {
	const width = useWindowWidth();
	return useMemo(() => breakpoint < width, [width, breakpoint]);
};

export const useBreakpointDown = (breakpoint: number): boolean => {
	const width = useWindowWidth();
	return useMemo(() => breakpoint > width, [width, breakpoint]);
};
