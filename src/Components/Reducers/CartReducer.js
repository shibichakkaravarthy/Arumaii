import { ACTIONTYPES } from '../Constants'

const INITIAL_STATE = []

export default (state = INITIAL_STATE, action) => {
	console.log('action', action)
	switch(action.types) {
		case ACTIONTYPES.PUSHCART:
			return action.payload

		default:
			return state
	}
}