import { ACTIONTYPES, API_URL } from '../Constants'
import axios from 'axios'

export const addCustomer = ( field, value ) => {
	return { type: ACTIONTYPES.MUTATECUSTOMERREDUCER, payload: { field, value } }
}

export const fetchCustomer = () => {
	return (dispatch) => {
		axios.get(API_URL+'/member/')
		.then(res => {
			console.log(res.data)
			dispatch({ type: ACTIONTYPES.MUTATECUSTOMERREDUCER, payload: { field: 'customers', value: res.data } })
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
				dispatch({ type: ACTIONTYPES.ALERTON, payload: { alertMessage: 'Member added successfully', alertFunction: null } })
			}
		})
	}
}