import { combineReducers } from "redux";
import { errorReducer } from "./errorReducer";
import successReducer from "./successReducer";
import billersReducer from "./billersReducer"
import transactionsReducer from "./transactionsReducer";
import customersReducer from "./customersReducer";
import invoicesReducer from "./invoicesReducer";
import paymentsReducer from "./paymentsReducer";
import paymentPagesReducer from "./paymentPagesReducer";
import paymentItemsReducer from "./paymentItemsReducer";
import subAccountsReducer from "./subAccountsReducer";

const rootReducer = combineReducers({
    success: successReducer,
    errors: errorReducer,
    billers: billersReducer,
    transactions: transactionsReducer,
    customers: customersReducer,
    invoices: invoicesReducer,
    payments: paymentsReducer,
    paymentPages: paymentPagesReducer,
    paymentItems: paymentItemsReducer,
    subAccounts: subAccountsReducer
});

export default rootReducer;