import { ApplicationActionTypes, IApplicationState, TApplicationActions } from './ApplicationTypes';

const initialState: IApplicationState = {
	searchKey: '',
	isEnvironmentReady: false,
};

export const applicationReducer = (state = initialState, action: TApplicationActions): IApplicationState => {
	switch (action.type) {
		case ApplicationActionTypes.SETUP_ENVIRONMENT_REQUEST:
			return state;
		case ApplicationActionTypes.SETUP_ENVIRONMENT_DONE:
			return { ...state, searchKey: action.payload, isEnvironmentReady: action.isEnvironmentReady };
		default:
			return state;
	}
};
