import axios from "axios"
import { authHeader, baseUrl, activeBusiness } from "../../utils"
import { CREATE_PAYMENT_PAGE, CREATING_PAYMENT_PAGE, FETCH_PAYMENT_PAGES, FETCHING_PAYMENT_PAGES, PAYMENT_PAGES_ERROR, UPDATE_PAYMENT_PAGE, UPDATING_PAYMENT_PAGE } from "../types"


export const fetchPaymentPages = (filterString, page, perPage) => async (dispatch) => {    
    try{
        const headers = authHeader()

        let url = `${baseUrl}/billers/payment-pages/get/biller/${activeBusiness().id}`
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
            type: FETCHING_PAYMENT_PAGES,
            payload: true
        })

        const response = await axios.get(url, { headers })

        dispatch({
            type: FETCH_PAYMENT_PAGES,
            payload: response.data
        })
        
    }
    catch(error){
        dispatch( {
            type: PAYMENT_PAGES_ERROR,
            error
        })
    }
}

export const createPaymentPage = (payload) => async (dispatch) => {    
    try{
        const headers = authHeader()

        dispatch({
            type: CREATING_PAYMENT_PAGE,
            payload: true
        })

        const response = await axios.post(`${baseUrl}/billers/payment-pages/create`, payload, { headers })
        
        dispatch({
            type: CREATE_PAYMENT_PAGE,
            payload: response.data.data
        })
        
    }
    catch(error){
        dispatch({
            type: PAYMENT_PAGES_ERROR,
            error
        })
    }
}

export const clearCreatedPaymentPage = (payload) => async (dispatch) => {    
    dispatch({
        type: CREATE_PAYMENT_PAGE,
        payload: null
    })
}

export const updatePaymentPage = (payload) => async (dispatch) => {    
    try{
        const headers = authHeader()

        dispatch({
            type: UPDATING_PAYMENT_PAGE,
            payload: true
        })

        const response = await axios.patch(`${baseUrl}/invoices/update`, payload, { headers })
        
        dispatch({
            type: UPDATE_PAYMENT_PAGE,
            payload: response.data.data
        })
        
    }
    catch(error){
        dispatch({
            type: PAYMENT_PAGES_ERROR,
            error
        })
    }
}

export const clearUpdatedPaymentPage = (payload) => async (dispatch) => {    
    dispatch({
        type: UPDATE_PAYMENT_PAGE,
        payload: null
    })
}
