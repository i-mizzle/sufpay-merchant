import { CREATE_API_KEY, CREATING_API_KEY, FETCH_API_KEYS, FETCH_BANKS, FETCHING_API_KEYS, FETCHING_BANKS, PAYMENTS_ERROR } from "../types";

const initialState = {
    loadingApiKeys: true,
    apiKeys: null,
    creatingApiKeys: false,
    createdApiKeys: null,
    paymentsError: null,
    loadingBanks: true,
    banks: []
};
  
const paymentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCHING_API_KEYS:
        return { 
            loadingApiKeys: action.payload 
        };
        case FETCH_API_KEYS:
        return { 
            loadingApiKeys: false,
            apiKeys: action.payload  
        };
        case CREATING_API_KEY:
        return { 
            creatingApiKeys: action.payload 
        };
        case CREATE_API_KEY:
        return { 
            creatingApiKeys: false,
            createdApiKeys: action.payload  
        };
        case FETCHING_BANKS:
        return { 
            loadingBanks: action.payload 
        };
        case FETCH_BANKS:
        return { 
            loadingBanks: false,
            banks: action.payload  
        };
        case PAYMENTS_ERROR:
        return { 
            loadingBanks: false,
            loadingApiKeys: false,
            paymentsError: action.payload  
        };
        default:
        return state;
    }
};
  
export default paymentsReducer;