import { FETCH_SUB_ACCOUNTS, FETCHING_SUB_ACCOUNTS, SUB_ACCOUNTS_ERROR } from "../types";


const initialState = {
    loadingSubAccounts: true,
    subAccounts: [],
    creatingSubAccount: false,
    createdSubAccount: null,
    subAccountsError: null,
};
  
const transactionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCHING_SUB_ACCOUNTS:
        return { 
            loadingSubAccounts: action.payload 
        };
        case FETCH_SUB_ACCOUNTS:
        return { 
            loadingSubAccounts: false,
            subAccounts: action.payload  
        };
        case SUB_ACCOUNTS_ERROR:
        return { 
            loadingSubAccounts: false,
            subAccountsError: action.payload  
        };
        default:
        return state;
    }
};
  
export default transactionsReducer;