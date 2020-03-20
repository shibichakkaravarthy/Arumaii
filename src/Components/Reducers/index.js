import {combineReducers} from 'redux'

import Cart from './CartReducer'

export default combineReducers({
	cart: Cart
})