import {combineReducers} from 'redux'

import Cart from './CartReducer'
import Customer from './CustomerReducer'
import Product from './ProductReducer'
import Expense from './ExpenseReducer'
import Alert from './AlertReducer'

export default combineReducers({
	cart: Cart,
	customer: Customer,
	product: Product,
	expense: Expense,
	alert: Alert
})