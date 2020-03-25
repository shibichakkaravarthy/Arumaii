import {ACTIONTYPES} from '../Constants'

const INITIAL_STATE = {
	expenses: [],
	newExpense: {
		date: '2020-03-22T16:14:38.064+00:00'
	}
}

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case ACTIONTYPES.MUTATEEXPENSE:
			return { ...state, [action.payload.field]: action.payload.value }

		default:
			return state
	}
}