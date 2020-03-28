import { ACTIONTYPES, API_URL } from '../Constants'
import axios from 'axios'
import { showMessage } from 'react-native-flash-message'

export const addCustomer = ( field, value ) => {
	return { type: ACTIONTYPES.MUTATECUSTOMERREDUCER, payload: { field, value } }
}

export const fetchCustomer = () => {
	console.log('requested')
	return (dispatch) => {
		axios.get(API_URL+'/member/')
		.then(res => {
			console.log(res.data)
			dispatch({ type: ACTIONTYPES.MUTATECUSTOMERREDUCER, payload: { field: 'customers', value: res.data } })
			dispatch({ type: ACTIONTYPES.MUTATERELOADSTATE, payload: false })
		})
	}
}

export const feedCustomerData = (customer) => {
	return { type: ACTIONTYPES.UPDATECUSTOMER, payload: customer }
}

export const updateCustomer = (id) => {
	return (dispatch, getState) => {
		const { customerName, customerMobile, customerCardNo } = getState().customer

		axios.patch(API_URL+'/member/update/'+id, { name: customerName, mobile: customerMobile, cardNo: customerCardNo })
		.then(res => {
			console.log('updated', res.data)
			if(res) {
				showMessage({
	              message: "Success",
	              type: "success",
	              description: "Customer Updated Successfully",
	              icon: "auto"
	            });
				dispatch({ type: ACTIONTYPES.MUTATERELOADSTATE, payload: true })
	        }
		})
		.catch(err => {
			console.log('error in update', err.response)
		})
	}
}

export const postCustomer = () => {
	return (dispatch, getState) => {
		const { customerName, customerMobile, customerCardNo } = getState().customer
		console.log('requested')
		let requestBody = { name: customerName, mobile: customerMobile, cardNo: customerCardNo }
		axios.post(API_URL+'/member/add', requestBody)
		.then(res => {
			if(res) {
				showMessage({
	              message: "Success",
	              type: "success",
	              description: "Customer Added Successfully",
	              icon: "auto"
	            });
	            dispatch({ type: ACTIONTYPES.MUTATERELOADSTATE, payload: true })
			}
		})
	}
}