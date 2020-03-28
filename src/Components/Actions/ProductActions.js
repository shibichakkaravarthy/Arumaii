import { ACTIONTYPES, API_URL } from '../Constants'
import axios from 'axios'
import { showMessage } from 'react-native-flash-message'

export const getProducts = () => {
	return (dispatch, getState) => {
		axios.get(API_URL+'/product')
		.then(res => {
			if(res) {
				dispatch({ type: ACTIONTYPES.MUTATEPRODUCT, payload: { field: 'products', value: res.data } })
	            dispatch({ type: ACTIONTYPES.MUTATERELOADSTATE, payload: false })
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

export const feedProductData = (product) => {
	console.log('action of product', product)
	return ({ type: ACTIONTYPES.UPDATEPRODUCT, payload: product })
}

export const postProduct = () => {
	return (dispatch, getState) => {
		let product = getState().product.product

		axios.post(API_URL+'/product/add', product)
		.then(res => {
			if(res) {
				console.log(res.data)
				showMessage({
	              message: "Success",
	              type: "success",
	              description: "Product added successfully",
	            });
	            dispatch({ type: ACTIONTYPES.MUTATERELOADSTATE, payload: true })
			}
		})
	}
}

export const updateProduct = (id) => {
	return (dispatch, getState) => {
		const reqBody = getState().product.product
		console.log('reqBody', reqBody)
		axios.patch(API_URL+'/product/update/'+id, reqBody )
		.then(res => {
			if(res.data) {
				showMessage({
	              message: "Success",
	              type: "success",
	              description: "Product updated successfully",
	            });
	            dispatch({ type: ACTIONTYPES.MUTATERELOADSTATE, payload: true })
	            console.log(res.data)
			}
		})
		.catch(err => {
			showMessage({
              message: "Error",
              type: "danger",
              description: err.response.msg
            });
            console.log('error', err.response)
		})
	}
}

export const deleteProduct = (id) => {
	return(dispatch) => {
		axios.delete(API_URL+'/product/delete/'+id)
		.then(res => {
			console.log(res.data)
			showMessage({
              message: "Success",
              type: "success",
              description: 'Deleted successfully'
            });
            dispatch({ type: ACTIONTYPES.MUTATERELOADSTATE, payload: true })
		})
	}
}