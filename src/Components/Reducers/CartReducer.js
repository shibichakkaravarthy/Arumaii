import { ACTIONTYPES } from '../Constants'

const INITIAL_STATE = {
	cart: [],
	customer: {},
	totalAmount: 0,
	totalPoints: 0
}

export default (state = INITIAL_STATE, action) => {
	console.log('cartReducer', action)
	switch(action.type) {
		case ACTIONTYPES.MUTATECART:
			return { ...state, [action.payload.field]: action.payload.value }

		case ACTIONTYPES.SETTOTALS:
			return { ...state, totalAmount: action.payload.totalAmount, totalPoints: action.payload.totalPoints }

		case ACTIONTYPES.RESETCART:
			return { cart: [], customer: {}, totalAmount: 0, totalPoints: 0 }

		default:
			return state
	}
}