import { combineReducers } from "redux";
import { errorReducer } from "./errorReducer";
import successReducer from "./successReducer";
import billersReducer from "./billersReducer"

const rootReducer = combineReducers({
    success: successReducer,
    errors: errorReducer,
    billers: billersReducer
});

export default rootReducer;