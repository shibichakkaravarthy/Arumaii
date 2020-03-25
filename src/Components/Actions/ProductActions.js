import { ACTIONTYPES, API_URL } from '../Constants'
import axios from 'axios'

export const getProducts = () => {
	return (dispatch, getState) => {
		axios.get(API_URL+'/product')
		.then(res => {
			if(res) {
				dispatch({ type: ACTIONTYPES.MUTATEPRODUCT, payload: { field: 'products', value: res.data } })
			}
		})
	}
}

export const addProduct = (field, value) => {
	return (dispatch, getState) => {
		let product = getState().product.product

		let newProduct = { ...product, [field]: value }

		dispatch({ type: ACTIONTYPES.MUTATEPRODUCT, payload: { field: 'product', value: newProduct } })
	}
}

export const postProduct = () => {
	return (dispatch, getState) => {
		let product = getState().product.product

		axios.post(API_URL+'/product/add', product)
		.then(res => {
			if(res) {
				console.log(res.data)
			}
		})
	}
}