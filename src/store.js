import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

function reducer(state = { images: [], postImages: [] }, action) {
    // console.log(action)
    switch (action.type) {
        case "wholeData":
            state = action.payload
            return state
        case "getImages":
            state.images = action.payload
            return state = { ...state }
        case "postImg":
            state.postImages = action.payload
            return state = { ...state }
        default:
            return state
    }
}

export let store = createStore(reducer, applyMiddleware(thunk))