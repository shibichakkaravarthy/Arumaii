import { ACTIONTYPES } from '../Constants'

const INITIAL_STATE = {
	cart: [],
	customer: {}
}

export default (state = INITIAL_STATE, action) => {
	console.log('cartReducer', action)
	switch(action.type) {
		case ACTIONTYPES.MUTATECART:
			return { ...state, [action.payload.field]: action.payload.value }

		default:
			return state
	}
}