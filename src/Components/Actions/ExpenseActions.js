import { ACTIONTYPES, API_URL } from '../Constants'
import axios from 'axios'
import { showMessage } from 'react-native-flash-message'

export const addExpense = (field, value) => {
	return (dispatch, getState) => {
		const expense = getState().expense.newExpense

		const newExpense = { ...expense, [field]: value }

		dispatch({ type: ACTIONTYPES.MUTATEEXPENSE, payload: { field: 'newExpense', value: newExpense } })
	}
}

export const fetchExpense = () => {
	return(dispatch) => {
		axios.get(API_URL+'/expense')
		.then(res => {
			dispatch({ type: ACTIONTYPES.MUTATEEXPENSE, payload: { field: 'expenses', value: res.data } })
			dispatch({ type: ACTIONTYPES.MUTATERELOADSTATE, payload: false })
		})
	}
}

export const postExpense = () => {
	return (dispatch, getState) => {
		let reqBody = getState().expense.newExpense
		axios.post(API_URL+'/expense/add', reqBody)
		.then(res => {
			if(res) {
				console.log('post Expense', res.data)
				showMessage({
	              message: "Success",
	              type: "success",
	              description: "Expense added Successfully",
	            });
				dispatch({ type: ACTIONTYPES.MUTATERELOADSTATE, payload: true })
			}
		})
		.catch(err => {
			console.log(err)
		})
	}
}