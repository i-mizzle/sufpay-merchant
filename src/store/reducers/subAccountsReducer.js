import { CREATE_SUB_ACCOUNT, CREATING_SUB_ACCOUNT, FETCH_SUB_ACCOUNTS, FETCHING_SUB_ACCOUNTS, SUB_ACCOUNTS_ERROR } from "../types";


const initialState = {
    loadingSubAccounts: true,
    subAccounts: [],
    creatingSubAccount: false,
    createdSubAccount: null,
    subAccountsError: null,
};
  
const subAccountsReducer = (state = initialState, action) => {
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
        case CREATING_SUB_ACCOUNT:
        return { 
            creatingSubAccount: action.payload 
        };
        case CREATE_SUB_ACCOUNT:
        return { 
            creatingSubAccount: false,
            createdSubAccount: action.payload  
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
  
export default subAccountsReducer;