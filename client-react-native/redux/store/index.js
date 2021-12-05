import {createStore, combineReducers, applyMiddleware} from 'redux';
// import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import tags from '../tags'
import groups from '../groups'
import carouselStatus from '../carouselStatus';
import tagScreenStatus from '../tagScreenStatus';
import tagDetails from '../tagDetails';
import allTagsScreenStatus from '../allTagsScreenStatus';


const reducer= combineReducers({
    tags,
    tagDetails, // Tobe created
    groups,
    carouselStatus,
    tagScreenStatus,
    allTagsScreenStatus,
});

const middleware= composeWithDevTools(
    applyMiddleware(thunkMiddleware, /* createLogger({ collapsed: true}) */)
);

const store= createStore(reducer, middleware);

export default store;
