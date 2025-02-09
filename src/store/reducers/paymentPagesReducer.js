import { CREATE_PAYMENT_PAGE, CREATING_PAYMENT_PAGE, FETCH_PAYMENT_PAGES, FETCHING_PAYMENT_PAGES, PAYMENT_PAGES_ERROR, UPDATE_PAYMENT_PAGE, UPDATING_PAYMENT_PAGE } from "../types";


const initialState = {
    loadingPaymentPages: true,
    paymentPages: null,
    creatingPaymentPage: false,
    createdPaymentPage: null,
    paymentPagesError: null,
    updatingPaymentPage: true,
    updatedPaymentPage: true,
};
  
const paymentPagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCHING_PAYMENT_PAGES:
        return { 
            loadingPaymentPages: action.payload 
        };
        case FETCH_PAYMENT_PAGES:
        return { 
            loadingPaymentPages: false,
            paymentPages: action.payload  
        };
        case CREATING_PAYMENT_PAGE:
        return { 
            creatingPaymentPage: action.payload 
        };
        case CREATE_PAYMENT_PAGE:
        return { 
            creatingPaymentPage: false,
            createdPaymentPage: action.payload  
        };
        case UPDATING_PAYMENT_PAGE:
        return { 
            updatingPaymentPage: action.payload 
        };
        case UPDATE_PAYMENT_PAGE:
        return { 
            updatingPaymentPage: false,
            updatedPaymentPage: action.payload  
        };
        case PAYMENT_PAGES_ERROR:
        return { 
            creatingPaymentPage: false,
            updatingPaymentPage: false,
            loadingPaymentPages: false,
            invoicesError: action.payload  
        };
        default:
        return state;
    }
};
  
export default paymentPagesReducer;