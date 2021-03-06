import { ACTIONTYPES, API_URL } from '../Constants'

const INITIAL_STATE = {
	products: [],
	product: {}
}

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case ACTIONTYPES.MUTATEPRODUCT:
			return { ...state, [action.payload.field]: action.payload.value }

		case ACTIONTYPES.UPDATEPRODUCT:
			return { ...state, product: action.payload }

		default:
			return state
	}
}