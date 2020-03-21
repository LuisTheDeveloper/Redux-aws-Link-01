import C from './constants'
import { suggestions } from './store/reducers'

export function addDay(resort, date, powder=false, backcountry=false) {

	return {
		type: C.ADD_DAY,
		payload: {resort,date,powder,backcountry}
	}

}

export const addError = (message) => 
    ({
        type: C.ADD_ERROR,
        payload: message
    })

export const clearError = index =>
    ({
        type: C.CLEAR_ERROR,
        payload: index

    })

export const changeSuggestions = suggestions =>
    ({
        type: C.CHANGE_SUGGESTIONS,
        payload: suggestions
    })

export const clearSuggestions = suggestions => ({
        type: C.CLEAR_SUGGESTIONS,
        payload: suggestions
})

export const removeDay = function(date) {

	return {
		type: C.REMOVE_DAY,
		payload: date
    }
}

export const setGoal = (goal) => 
	({
		type: C.SET_GOAL,
		payload: goal
    })
    
// This thunk is going to check the existing state of the store, 
// if we are currently fetching resort names, it will not dispatch any action, 
// else, it will dispatch an action for fetching the resort names, wait 1,5 seconds and cancel the fetching.
export const randomGoals = () => (dispatch, getState) => {

    if(!getState().resortNames.fetching){

        dispatch({
            type: C.FETCH_RESORT_NAMES
        })
    
        setTimeout(() => {
    
            dispatch({
                type: C.CANCEL_FETCHING
            })
        }, 1500)

    }
}
