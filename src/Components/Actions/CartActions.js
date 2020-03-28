import { ACTIONTYPES, API_URL } from '../Constants'
import axios from 'axios'
import { showMessage, hideMessage } from "react-native-flash-message";
import NavigationService from '../../NavigationService'

console.log('NavigationService', NavigationService)

export const addItem = (item, quantity) => {
	return (dispatch, getState) => {
		const cart = getState().cart.cart
		console.log('before', item, quantity)

		let cartItem = {...item, quantity, price: item.price * quantity, points: item.points*quantity}

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

export const payBill = (callback) => {
	return (dispatch, getState) => {
		const { cart, customer } = getState().cart

		let totalAmount = 0
		let totalPoints = 0
		cart.map(item => {
			totalAmount = totalAmount + item.price
			totalPoints = totalPoints + item.points
			return null
		})

		let reqBody = {
			memberId: customer._id,
			items: cart,
			totalAmount,
			totalPoints
		}
		console.log('request body', reqBody)

		axios.post(API_URL+'/bill/add', reqBody)
		.then(res => {
			if(res) {
				console.log(res)
				showMessage({
	              message: "Success",
	              type: "success",
	              description: "Your bill Id is " + res.data.bill._id,
	            });
			}
		})
		.catch(err => {
			showMessage({
              message: "Error",
              type: "danger",
              description: err.response.data.msg,
            });

            setTimeout(() => { callback() }, 2000)
			console.log('bill error', err.response.data)
		})
	}
}