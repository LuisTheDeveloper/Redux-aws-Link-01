import C from '../constants'
import appReducer from './reducers'
import { createStore, applyMiddleware } from 'redux'

/*  Index.js exports a function that we use to create stores */

/*  The reason to encapsulate everything in this file is to add middleware
    middleware uses a higher order function 
    in order to create middleware we need to create 
    a function that returns 
                    a function that returns
                                    a function */

/*  The reason that is higher order function is because we have asynchronicity to deal with:
    The action is going to be dispatched when that occurs


/* Middleware for logging messages to the console */                                    

// the function consoleMessages: gets a specific argument: the store will be injected into this function
// we must return a function and a different argument will be injected into 
//  the function 2
//  that argument is called next and the function 2 will be used to invoke or dispatch the action
//  function 2 need to return another function, function 3
//      function 3 will pass the action itself - action that is going to be dispatched.
//
/* **** using arrow functions to make the code nicer **** :)
// **** instead of having this:
const consoleMessages = function(store){
    return function(next){
        return function(action){

        }
    }
}
*/

// we have this: 3 arrow functions in a row and without parentheses because they only have one argument
// This function give us the action that is currently being dispatched, along with a mechanism to
// dispatch that action and change the state
// we make sure that we do not break the store's current dispatch pipeline
const consoleMessages = store => next => action => {

    let result

    // Functionality before we dispatch the action
    // Console groups allows us to group all of the logs that are associated with this action into a collapsible group on the console
    console.groupCollapsed(`dispatching action => ${action.type}`)  // string template to log the action that is being dispatched
    
    console.log('ski days', store.getState().allSkiDays.length) // information about the state before the action is dispatched

    result = next(action)   // where the action gets dispatched and our state will change we can add functionality before or after this line.

    // get state after the action has been dispatched
    let { allSkiDays, goal, errors, resortNames } = store.getState()

    console.log(`

        ski days: ${allSkiDays.length}
        goal: ${goal}
        fetching: ${resortNames.fetching}
        suggestions: ${resortNames.suggestions}
        errors: ${errors.length}
    
    `)

    console.groupEnd()

    return result           // to make sure the state change gets registered we must return the result
}

// function to use our createStore with our appReducer
// function must be able to take in the initialState
// initialState is set to an empty object
// initialState is to be added to our createStore method
export default (initialState={}) => {
    // applyMiddleware is going to apply our consoleMessages 
    // and return a function. 
    // We send to that function the createStore function that we are using to build our stores
    // this will return a new createStore function, that will create stores with our consoleMessages middleware
    return applyMiddleware(consoleMessages) (createStore) (appReducer, initialState)
}