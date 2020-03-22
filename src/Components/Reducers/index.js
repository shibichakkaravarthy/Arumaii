import {combineReducers} from 'redux'

import Cart from './CartReducer'
import Customer from './CustomerReducer'

export default combineReducers({
	cart: Cart,
	customer: Customer
})