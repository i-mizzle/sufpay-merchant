import axios from "axios"
import { authHeader, baseUrl, activeBusiness } from "../../utils"
import { CREATE_TRANSACTION, CREATING_TRANSACTION, FETCH_TRANSACTIONS, FETCHING_TRANSACTIONS, TRANSACTIONS_ERROR, UPDATE_TRANSACTION, UPDATING_TRANSACTION } from "../types"

export const fetchTransactions = (filterString, page, perPage) => async (dispatch) => {    
    try{
        const headers = authHeader()

        let url = `${baseUrl}/payments/transactions/get/billers/${activeBusiness().id}`
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
            type: FETCHING_TRANSACTIONS,
            payload: true
        })

        const response = await axios.get(url, { headers })

        dispatch({
            type: FETCH_TRANSACTIONS,
            payload: response.data
        })
        
    }
    catch(error){
        dispatch( {
            type: TRANSACTIONS_ERROR,
            error
        })
    }
}

export const createTransaction = (payload) => async (dispatch) => {    
    try{
        const headers = authHeader()

        dispatch({
            type: CREATING_TRANSACTION,
            payload: true
        })

        const response = await axios.post(`${baseUrl}/payments/settlement-accounts/create`, payload, { headers })
        
        dispatch({
            type: CREATE_TRANSACTION,
            payload: response.data.data
        })
        
    }
    catch(error){
        dispatch({
            type: TRANSACTIONS_ERROR,
            error
        })
    }
}

export const clearCreatedTransaction = () => async (dispatch) => {    
    dispatch({
        type: CREATE_TRANSACTION,
        payload: null
    })
}

export const updateTransaction = (payload) => async (dispatch) => {    
    try{
        const headers = authHeader()

        dispatch({
            type: UPDATING_TRANSACTION,
            payload: true
        })

        const response = await axios.patch(`${baseUrl}/invoices/update`, payload, { headers })
        
        dispatch({
            type: UPDATE_TRANSACTION,
            payload: response.data.data
        })
        
    }
    catch(error){
        dispatch({
            type: TRANSACTIONS_ERROR,
            error
        })
    }
}

export const clearUpdatedTransaction = () => async (dispatch) => {    
    dispatch({
        type: TRANSACTIONS_ERROR,
        payload: null
    })
}
