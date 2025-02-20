import axios from "axios"
import { authHeader, baseUrl, activeBusiness } from "../../utils"
import { CREATE_INVOICE, CREATING_INVOICE, FETCH_INVOICES, FETCHING_INVOICES, INVOICES_ERROR, UPDATE_INVOICE, UPDATING_INVOICE } from "../types"

export const fetchInvoices = (filterString, page, perPage) => async (dispatch) => {    
    try{
        const headers = authHeader()

        let url = `${baseUrl}/billers/invoices/get/biller/${activeBusiness().id}`
        if(filterString && filterString !== '') {
            url += `${url.includes('?') ? '&' : '?'}${filterString}`
        }

        if(page && page!=='') {
            url += `${url.includes('?') ? '&' : '?'}pagenumber=${page}`
        }

        if(perPage && perPage!=='') {
            url += `${url.includes('?') ? '&' : '?'}pagesize=${perPage}`
        }

        dispatch( {
            type: FETCHING_INVOICES,
            payload: true
        })

        const response = await axios.get(url, { headers })

        dispatch({
            type: FETCH_INVOICES,
            payload: response.data
        })
        
    }
    catch(error){
        dispatch( {
            type: INVOICES_ERROR,
            error
        })
    }
}

export const createInvoice = (payload) => async (dispatch) => {    
    try{
        const headers = authHeader()

        dispatch({
            type: CREATING_INVOICE,
            payload: true
        })

        const response = await axios.post(`${baseUrl}/billers/invoices/create`, payload, { headers })
        
        dispatch({
            type: CREATE_INVOICE,
            payload: response.data.data
        })
        
    }
    catch(error){
        dispatch({
            type: INVOICES_ERROR,
            error
        })
    }
}

export const clearCreatedInvoice = (payload) => async (dispatch) => {    
    dispatch({
        type: CREATE_INVOICE,
        payload: null
    })
}

export const updateInvoice = (payload) => async (dispatch) => {    
    try{
        const headers = authHeader()

        dispatch({
            type: UPDATING_INVOICE,
            payload: true
        })

        const response = await axios.patch(`${baseUrl}/invoices/update`, payload, { headers })
        
        dispatch({
            type: UPDATE_INVOICE,
            payload: response.data.data
        })
        
    }
    catch(error){
        dispatch({
            type: INVOICES_ERROR,
            error
        })
    }
}

export const clearUpdatedInvoice = (payload) => async (dispatch) => {    
    dispatch({
        type: UPDATE_INVOICE,
        payload: null
    })
}
