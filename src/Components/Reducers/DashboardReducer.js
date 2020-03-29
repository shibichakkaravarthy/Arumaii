import {ACTIONTYPES, API_URL} from '../Constants'

const INITIAL_STATE = {
	bills: [],
	members: [],
	products: [],
}

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case ACTIONTYPES.MUTATEDASHBOARD:
			return { ...state, bills: action.payload.build, members: action.payload.members, products: action.payload.products }

		default:
			return state
	}
}