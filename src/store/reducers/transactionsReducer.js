import { FETCH_TRANSACTIONS, FETCHING_TRANSACTIONS, TRANSACTIONS_ERROR } from "../types";

const initialState = {
    loadingTransactions: true,
    transactions: [],
    transactionsError: null,
};
  
const transactionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCHING_TRANSACTIONS:
        return { 
            loadingCategories: action.payload 
        };
        case FETCH_TRANSACTIONS:
        return { 
            loadingTransactions: false,
            transactions: action.payload  
        };
        case TRANSACTIONS_ERROR:
        return { 
            loadingTransactions: false,
            transactionsError: action.payload  
        };
        default:
        return state;
    }
};
  
export default transactionsReducer;