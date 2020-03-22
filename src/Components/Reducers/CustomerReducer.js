import { ACTIONTYPES } from '../Constants'

const INITIAL_STATE = {
	customers: [],
	customerName: '',
	customerMobile: '',
	customerCardNo: '',
	joinedOn: null
}

export default (state=INITIAL_STATE, action) => {
	switch(action.type) {
		case ACTIONTYPES.MUTATECUSTOMERREDUCER:
			return { ...state, [action.payload.field]: action.payload.value }

		default:
			return state
	}
}