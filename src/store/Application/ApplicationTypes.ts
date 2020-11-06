const SETUP_ENVIRONMENT_REQUEST = 'APPLICATION/ENVIRONMENT_REQUEST' as const;
const SETUP_ENVIRONMENT_DONE = 'APPLICATION/ENVIRONMENT_DONE' as const;
const SETUP_ENVIRONMENT_ERROR = 'APPLICATION/ENVIRONMENT_ERROR' as const;

export const ApplicationActionTypes = {
	SETUP_ENVIRONMENT_REQUEST,
	SETUP_ENVIRONMENT_DONE,
	SETUP_ENVIRONMENT_ERROR,
} as const;

export interface IApplicationState {
	readonly searchKey: string;
	readonly isEnvironmentReady: boolean;
}

interface ISetupEnvironmentRequestAction {
	readonly type: typeof SETUP_ENVIRONMENT_REQUEST;
}

interface ISetupEnvironmentDoneAction {
	readonly type: typeof SETUP_ENVIRONMENT_DONE;
	readonly payload: string;
	readonly isEnvironmentReady: boolean;
}

export type TApplicationActions = ISetupEnvironmentRequestAction | ISetupEnvironmentDoneAction;
