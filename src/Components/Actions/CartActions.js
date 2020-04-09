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

		let totalAmount = 0
		let totalPoints = 0
		
		cart.map(item => {
			totalAmount = totalAmount + item.price
			totalPoints = totalPoints + item.points
			return null
		})

		console.log('totals', totalAmount, totalPoints)

		dispatch({
			type: ACTIONTYPES.SETTOTALS,
			payload: { totalAmount, totalPoints }
		})
	}
}

export const applyRedeem = () => {
	return async (dispatch, getState) => {
		const cart = getState().cart
		console.log('cart', cart.totalAmount)

		let itemCart = JSON.parse(JSON.stringify(cart.cart))

		let cartItem = null
		let redeemedAmount = 0
		let redeemedPoints = 0

		if(cart.totalAmount >= 100 && cart.customer.points >= 20*16) {
			redeemedAmount = cart.totalAmount*(20/100)
			redeemedPoints = redeemedAmount.toFixed(0)*16
			cartItem = { name: 'Redeem Points', quantity: 1, price: redeemedAmount * -1, points: 0 }
			itemCart.push(cartItem)
			console.log('cart after redeem', itemCart)

			dispatch({
				type: ACTIONTYPES.MUTATECART,
				payload: { field: 'cart', value:itemCart }
			})

			dispatch({
				type: ACTIONTYPES.SETTOTALS,
				payload: { totalAmount: cart.totalAmount - redeemedAmount, totalPoints: redeemedPoints*-1 }
			})
		}

		else {
			showMessage({
              message: "Error",
              type: "danger",
              description: 'Not Eligible for Redemption',
            });
		}
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
		const { cart, customer, totalAmount, totalPoints } = getState().cart

		let reqBody = {
			memberId: customer._id,
			items: cart,
			totalAmount,
			totalPoints,
			date: new Date()
		}
		console.log('request body', reqBody)

		axios.post(API_URL+'/bill/add', reqBody)
		.then(res => {
			if(res) {
				console.log(res)
				showMessage({
	              message: "Success",
	              type: "success",
	              description: "Your bill Id is " + res.data._id,
	            });
	            NavigationService.navigate('SelectCustomer')
	            dispatch({ type: ACTIONTYPES.RESETCART })
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