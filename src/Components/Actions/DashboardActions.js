import { ACTIONTYPES, API_URL } from '../Constants'
import axios from 'axios'
import { showMessage } from 'react-native-flash-message'
import moment from 'moment'

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

export const getMemberData = (memberId) => {
	return(dispatch) => {
		axios.get(API_URL+'/dashboard/getMember/'+memberId)
		.then(res => {
			console.log('got member', res.data)
			dispatch({ type: ACTIONTYPES.MUTATEDASHBOARD, payload: { field: 'billMember', value: res.data } })
		})
	}
}

export const clearMemberData = () => {
	return { type: ACTIONTYPES.MUTATEDASHBOARD, payload: { field: 'billMember', value: { name: '', cardNo: '', mobile: '', points: 0 } } }
}

export const membersOfTheMonth = () => {
	return (dispatch, getState) => {
		const members = []
		const bills = getState().dashboard.bills

		const currentMonthBills = bills.filter(bill => {
			return moment(bill.date).isSame(moment(), 'month')
		})

		currentMonthBills.map(bill => {
			const index = members.findIndex(member => member.memberId == bill.memberId)
			console.log('index of member', index)

			if(bill.totalPoints) {	
				if(index >= 0) {
					console.log('member point info', members[index].points)
					members[index].points += bill.totalPoints 
				}

				else {
					members.push({ memberId: bill.memberId, points: bill.totalPoints })
				}
			}
		})

		let sorted = members.sort((a, b) => b.points - a.points)

		axios.post(API_URL + '/dashboard/getMemberData', { memberIds: [sorted[0], sorted[1]] })
		.then(res => {
			dispatch({ type: ACTIONTYPES.MUTATEDASHBOARD, payload: { field: 'topMembers', value: res.data } })
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

		console.log('members of the month', sorted)
	}
}