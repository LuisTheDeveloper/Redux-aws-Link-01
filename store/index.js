import C from '../constants'
import appReducer from './reducers'
import { createStore } from 'redux'

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

// the function 1: gets a specific argument: the store will be injected into this function
// we must return a function and a different argument will be injected into 
//  the function 2
//  that argument is called next and the function 2 will be used to invoke or dispatch the action
//  function 2 need to return another function, function 3
//      function 3 will pass the action itself - action that is going to be dispatched.
//
// **** using arrow functions to make the code nicer **** :)
const consoleMessages = function(store){
    return function(next){
        return function(action)
    }
}


// function to use our createStore with our appReducer
// function must be able to take in the initialState
// initialState is set to an empty object
// initialState is to be added to our createStore method
export default (initialState={}) => {
    return createStore(appREducer, initialState)
}