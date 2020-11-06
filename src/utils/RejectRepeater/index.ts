interface IFetchRejectRepeater {
	readonly retries?: number;
	readonly retryDelay?: number;
}

type TFetch = typeof fetch;

export const fetchRejectRepeater = (...fetchParameters: Parameters<TFetch>) => {
	return async (options: IFetchRejectRepeater = {}): ReturnType<TFetch> => {
		const { retries = 5, retryDelay = 100 } = options;
		try {
			const response = await fetch(...fetchParameters);
			if (!response.ok) {
				if (response.status >= 500)
					throw new Error(`\nUnexpected Server Error.\n\tStatus: ${response.statusText}`);
				if (response.status >= 400)
					throw new Error(`\nUnexpected Client Error.\n\tStatus: ${response.statusText}`);
				throw new Error(`\nUnexpected Error.\n\tStatus: ${response.status} || ${response.statusText}`);
			}
			return response;
		} catch (lastRetryError) {
			if (retries <= 1) {
				throw lastRetryError;
			}
			return new Promise((resolve, reject) =>
				setTimeout(() => {
					fetchRejectRepeater(...fetchParameters)({ ...options, retries: retries - 1 })
						.then(result => resolve(result))
						.catch(error => reject(error));
				}, retryDelay),
			);
		}
	};
};
