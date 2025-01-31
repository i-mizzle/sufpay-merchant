import { CREATE_CUSTOMER, CREATING_CUSTOMER, CUSTOMERS_ERROR, FETCH_CUSTOMERS, FETCHING_CUSTOMERS, UPDATE_CUSTOMER, UPDATING_CUSTOMER } from "../types";


const initialState = {
    loadingCustomers: true,
    customers: [],
    creatingCustomer: false,
    createdCustomer: null,
    updatingCustomer: false,
    updatedCustomer: null,
    customersError: null,
};
  
const customersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCHING_CUSTOMERS:
        return { 
            loadingCustomers: action.payload 
        };
        case FETCH_CUSTOMERS:
        return { 
            loadingCustomers: false,
            customers: action.payload  
        };
        case CREATING_CUSTOMER:
        return { 
            creatingCustomer: action.payload 
        };
        case CREATE_CUSTOMER:
        return { 
            creatingCustomer: false,
            createdCustomer: action.payload  
        };
        case UPDATING_CUSTOMER:
        return { 
            updatingCustomer: action.payload 
        };
        case UPDATE_CUSTOMER:
        return { 
            updatingCustomer: false,
            updatedCustomer: action.payload  
        };
        case CUSTOMERS_ERROR:
        return { 
            loadingCustomers: false,
            creatingCustomer: false,
            customersError: action.payload  
        };
        default:
        return state;
    }
};
  
export default customersReducer;