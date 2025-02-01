import { CREATE_INVOICE, CREATING_INVOICE, FETCH_INVOICES, FETCHING_INVOICES, INVOICES_ERROR, UPDATE_INVOICE, UPDATING_INVOICE } from "../types";


const initialState = {
    loadingInvoices: true,
    invoices: null,
    creatingInvoice: false,
    createdInvoice: null,
    invoicesError: null,
    updatingInvoice: true,
    updatedInvoice: true,
};
  
const invoicesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCHING_INVOICES:
        return { 
            loadingInvoices: action.payload 
        };
        case FETCH_INVOICES:
        return { 
            loadingInvoices: false,
            invoices: action.payload  
        };
        case CREATING_INVOICE:
        return { 
            creatingInvoice: action.payload 
        };
        case CREATE_INVOICE:
        return { 
            creatingInvoice: false,
            createdInvoice: action.payload  
        };
        case UPDATING_INVOICE:
        return { 
            updatingInvoice: action.payload 
        };
        case UPDATE_INVOICE:
        return { 
            updatingInvoice: false,
            updatedInvoice: action.payload  
        };
        case INVOICES_ERROR:
        return { 
            creatingInvoice: false,
            updatingInvoice: false,
            loadingInvoices: false,
            invoicesError: action.payload  
        };
        default:
        return state;
    }
};
  
export default invoicesReducer;