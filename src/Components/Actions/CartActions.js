import { ACTIONTYPES, API_URL } from '../Constants'
import axios from 'axios'

export const addItem = (item, quantity) => {
	return (dispatch, getState) => {
		const cart = getState().cart.cart
		console.log('before', item, quantity)

		let cartItem = {...item, quantity, price: item.price * quantity, points: 10}

		let itemIndex = null

		cart.map((i, ind) => {
			if(i.name === item.name) {
				itemIndex = ind
			}

			return null
		})

		if(itemIndex !== null) {
			cart[itemIndex] = { ...cart[itemIndex], quantity: cart[itemIndex].quantity + quantity, price: cart[itemIndex].price + (quantity*item.price)  }
		}

		else {
			cart.push(cartItem)
		}


		dispatch({
			type: ACTIONTYPES.MUTATECART,
			payload: { field: 'cart', value:cart }
		})
	}
}

export const selectCustomer = (customer) => {
	console.log('customer selected in action', customer)
	return ({ type: ACTIONTYPES.MUTATECART, payload: { field: 'customer', value: customer } })
}

export const removeItem = (index) => {
	return (dispatch, getState) => {
		const cart = getState().cart.cart

		cart.splice(index, 1)

		dispatch({
			type: ACTIONTYPES.MUTATECART,
			payload: { field: 'cart', value:[...cart] }
		})
	}
}

export const payBill = () => {
	return (dispatch, getState) => {
		const { cart, customer } = getState().cart

		let totalAmount = 0
		let totalPoints = 0
		cart.map(item => {
			totalAmount = totalAmount + item.price
			return null
		})

		let reqBody = {
			memberId: customer._id,
			items: cart,
			totalAmount,
			totalPoints
		}
		console.log('request body', reqBody)

		// axios.post(API_URL+'/bill/add', )
	}
}