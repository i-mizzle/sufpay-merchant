import axios from "axios"
import { authHeader, baseUrl, activeBusiness } from "../../utils"
import { CREATE_PAYMENT_ITEM, CREATING_PAYMENT_ITEM, FETCH_ITEM_CATEGORIES, FETCH_PAYMENT_ITEMS, FETCHING_ITEM_CATEGORIES, FETCHING_PAYMENT_ITEMS, PAYMENT_ITEMS_ERROR, UPDATE_PAYMENT_ITEM, UPDATING_PAYMENT_ITEM } from "../types"


export const fetchPaymentItems = (filterString, page, perItem) => async (dispatch) => {    
    try{
        const headers = authHeader()

        let url = `${baseUrl}/billers/biller-items/get/biller/${activeBusiness().id}`
        if(filterString && filterString !== '') {
            url += `${url.includes('?') ? '&' : '?'}${filterString}`
        }

        if(page && page!=='') {
            url += `${url.includes('?') ? '&' : '?'}pagenumber=${page}`
        }

        if(perItem && perItem!=='') {
            url += `${url.includes('?') ? '&' : '?'}pagesize=${perItem}`
        }

        dispatch( {
            type: FETCHING_PAYMENT_ITEMS,
            payload: true
        })

        const response = await axios.get(url, { headers })

        dispatch({
            type: FETCH_PAYMENT_ITEMS,
            payload: response.data
        })
        
    }
    catch(error){
        dispatch( {
            type: PAYMENT_ITEMS_ERROR,
            error
        })
    }
}

export const createPaymentItem = (payload) => async (dispatch) => {    
    try{
        const headers = authHeader()

        dispatch({
            type: CREATING_PAYMENT_ITEM,
            payload: true
        })

        const response = await axios.post(`${baseUrl}/billers/biller-items/create`, payload, { headers })
        
        dispatch({
            type: CREATE_PAYMENT_ITEM,
            payload: response.data
        })
        
    }
    catch(error){
        dispatch({
            type: PAYMENT_ITEMS_ERROR,
            error
        })
    }
}

export const fetchPaymentItemCategories = () => async (dispatch) => {    
    try{
        const headers = authHeader()

        let url = `${baseUrl}/billers/biller-items/categories/get/all`
        dispatch( {
            type: FETCHING_ITEM_CATEGORIES,
            payload: true
        })

        const response = await axios.get(url, { headers })

        dispatch({
            type: FETCH_ITEM_CATEGORIES,
            payload: response.data
        })
        
    }
    catch(error){
        dispatch( {
            type: PAYMENT_ITEMS_ERROR,
            error
        })
    }
}

// export const createPaymentItemCategory = (payload) => async (dispatch) => {    
//     try{
//         const headers = authHeader()

//         dispatch({
//             type: CREATING_PAYMENT_ITEM,
//             payload: true
//         })

//         const response = await axios.post(`${baseUrl}/billers/invoices/create`, payload, { headers })
        
//         dispatch({
//             type: CREATE_PAYMENT_ITEM,
//             payload: response.data.data
//         })
        
//     }
//     catch(error){
//         dispatch({
//             type: PAYMENT_ITEMS_ERROR,
//             error
//         })
//     }
// }

export const clearCreatedPaymentItem = (payload) => async (dispatch) => {    
    dispatch({
        type: CREATE_PAYMENT_ITEM,
        payload: null
    })
}

export const updatePaymentItem = (payload) => async (dispatch) => {    
    try{
        const headers = authHeader()

        dispatch({
            type: UPDATING_PAYMENT_ITEM,
            payload: true
        })

        const response = await axios.patch(`${baseUrl}/invoices/update`, payload, { headers })
        
        dispatch({
            type: UPDATE_PAYMENT_ITEM,
            payload: response.data.data
        })
        
    }
    catch(error){
        dispatch({
            type: PAYMENT_ITEMS_ERROR,
            error
        })
    }
}

export const clearUpdatedPaymentItem = (payload) => async (dispatch) => {    
    dispatch({
        type: UPDATE_PAYMENT_ITEM,
        payload: null
    })
}
