import { loadingBarReducer } from 'react-redux-loading-bar';
import { Action, combineReducers } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { applicationReducer } from './Application/ApplicationReducer';
import { filterReducer } from './Filter/FilterReducer';
import { productReducer } from './Product/ProductReducer';

export const rootReducer = combineReducers({
	loadingBar: loadingBarReducer,
	product: productReducer,
	filter: filterReducer,
	application: applicationReducer,
});

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export type RootState = ReturnType<typeof rootReducer>;
