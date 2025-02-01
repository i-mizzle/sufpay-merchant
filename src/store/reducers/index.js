import { combineReducers } from "redux";
import { errorReducer } from "./errorReducer";
import successReducer from "./successReducer";
import billersReducer from "./billersReducer"
import transactionsReducer from "./transactionsReducer";
import customersReducer from "./customersReducer";
import invoicesReducer from "./invoicesReducer";

const rootReducer = combineReducers({
    success: successReducer,
    errors: errorReducer,
    billers: billersReducer,
    transactions: transactionsReducer,
    customers: customersReducer,
    invoices: invoicesReducer
});

export default rootReducer;