import {ACTIONTYPES, API_URL} from '../Constants'

const INITIAL_STATE = {
	bills: [],
	members: [],
	products: [],
	expenses: []
}

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case ACTIONTYPES.FETCHDASHBOARDDATA:
			return { ...state, bills: action.payload.bills, members: action.payload.members, products: action.payload.products, expenses: action.payload.expenses }

		case ACTIONTYPES.MUTATEDASHBOARD:
			return { ...state, [action.payload.field]: action.payload.value }

		default:
			return state
	}
}