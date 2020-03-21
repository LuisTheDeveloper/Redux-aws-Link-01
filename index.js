import C from './constants'

// import our function that we use to create stores - storeFactory is an optional name you can call whatever you want
// there is an index file under store folder all we need is to add the folder to the import command line.
import storeFactory from './store'

// load initialState from local storage: to include on the store we create
const initialState = (localStorage['redux-store']) ?
	JSON.parse(localStorage['redux-store']) :
	{}

// save state to localStorage: to include on the store we create
const saveState = () => {
	const state = JSON.stringify(store.getState())
	localStorage['redux-store'] = state 
}

// We can create a new store based on our storeFactory, optional initialState
// load initialStage from localstorage
const store = storeFactory(initialState)

// Now that we have a store we can use our subscribe method to our store
// subscribe the savestate method to our store
// every time we dispatch an action it will save our state 
// the store has MIDDLEWARE associated with it will log console groups for each action that's being dispatched
store.subscribe(saveState)

store.dispatch({
	type: C.ADD_DAY,
	payload: {
		"resort": "Mt Shasta",
		"date": "2016-10-28",
		"powder": true,
		"backcountry": true	
	}
})

store.dispatch({
	type: C.ADD_DAY,
	payload: {
		"resort": "Mt Everest",
		"date": "2016-3-28",
		"powder": true,
		"backcountry": false	
	}
})

store.dispatch({
	type: C.ADD_DAY,
	payload: {
		"resort": "Lion Sierra",
		"date": "2016-12-15",
		"powder": false,
		"backcountry": true	
	}
})