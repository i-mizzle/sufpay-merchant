import { CREATE_PAYMENT_ITEM, CREATING_PAYMENT_ITEM, FETCH_ITEM_CATEGORIES, FETCH_PAYMENT_ITEMS, FETCHING_ITEM_CATEGORIES, FETCHING_PAYMENT_ITEMS, PAYMENT_ITEMS_ERROR, UPDATE_PAYMENT_ITEM, UPDATING_PAYMENT_ITEM } from "../types";


const initialState = {
    loadingCategories: true,
    categories: [],
    loadingPaymentItems: true,
    paymentItems: null,
    creatingPaymentItem: false,
    createdPaymentItem: null,
    paymentItemsError: null,
    updatingPaymentItem: true,
    updatedPaymentItem: true,
};
  
const paymentItemsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCHING_ITEM_CATEGORIES:
        return { 
            loadingCategories: action.payload 
        };
        case FETCH_ITEM_CATEGORIES:
        return { 
            loadingCategories: false,
            categories: action.payload  
        };
        case FETCHING_PAYMENT_ITEMS:
        return { 
            loadingPaymentItems: action.payload 
        };
        case FETCH_PAYMENT_ITEMS:
        return { 
            loadingPaymentItems: false,
            paymentItems: action.payload  
        };
        case CREATING_PAYMENT_ITEM:
        return { 
            creatingPaymentItem: action.payload 
        };
        case CREATE_PAYMENT_ITEM:
        return { 
            creatingPaymentItem: false,
            createdPaymentItem: action.payload  
        };
        case UPDATING_PAYMENT_ITEM:
        return { 
            updatingPaymentItem: action.payload 
        };
        case UPDATE_PAYMENT_ITEM:
        return { 
            updatingPaymentItem: false,
            updatedPaymentItem: action.payload  
        };
        case PAYMENT_ITEMS_ERROR:
        return { 
            creatingPaymentItem: false,
            updatingPaymentItem: false,
            loadingPaymentItems: false,
            invoicesError: action.payload  
        };
        default:
        return state;
    }
};
  
export default paymentItemsReducer;