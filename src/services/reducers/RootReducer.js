import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import ProductReducer from "./ProductReducer";

const RootReducer = combineReducers({
    AuthReducer,
    ProductReducer
});

export default RootReducer;