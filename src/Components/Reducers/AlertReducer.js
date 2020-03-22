import {ACTIONTYPES} from '../Constants'

const INITIAL_STATE = {
	alertStatus: true,
	alertMessage: '',
	alertFunction: null
}

export default (state=INITIAL_STATE, action) => {
	switch(action.type) {
		case ACTIONTYPES.ALERTON:
			return { ...state, alertStatus: true, alertMessage: action.payload.alertMessage, alertFunction: action.payload.alertFunction }

		case ACTIONTYPES.ALERTOFF:
			return { ...state, alertStatus: false, alertMessage: '', alertFunction: null }

		default:
			return state
	}
}