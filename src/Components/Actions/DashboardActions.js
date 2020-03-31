import { ACTIONTYPES, API_URL } from '../Constants'
import axios from 'axios'
import { showMessage } from 'react-native-flash-message'

export const getDashboardData = () => {
	return (dispatch) => {
		axios.get(API_URL + '/dashboard/main')
		.then(res => {
			const { bills, members, products, expenses } = res.data
			console.log('dashboard res.data', res.data)
			dispatch({ type: ACTIONTYPES.FETCHDASHBOARDDATA, payload: { bills, members, products, expenses } })
		})
		.catch(err => {
			console.log(err)
			showMessage({
              message: "Error",
              type: "danger",
              description: err.response,
              icon: "auto"
            });
		})
	}
}