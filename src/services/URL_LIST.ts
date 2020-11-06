const MAIN_API_URL = 'https://front-test.beta.aviasales.ru/' as const;
export const TICKETS_SEARCH_QUERY = 'searchId' as const;
export const GET_SEARCH_ID_URL: URL = new URL('/search', MAIN_API_URL);
export const GET_TICKETS_URL: URL = new URL('/tickets', MAIN_API_URL);
