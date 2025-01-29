import axios from "axios"
import { authHeader, baseUrl } from "../../utils"
import { CREATE_SUB_ACCOUNT, CREATING_SUB_ACCOUNT, FETCH_SUB_ACCOUNTS, FETCHING_SUB_ACCOUNTS, SUB_ACCOUNTS_ERROR, UPDATE_SUB_ACCOUNT, UPDATING_SUB_ACCOUNT } from "../types"

export const fetchSubAccounts = (billerCode, filterString, page, perPage) => async (dispatch) => {    
    try{
        const headers = authHeader()

        let url = `${baseUrl}/invoicing/invoices/biller/${billerCode}`
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
            type: FETCHING_SUB_ACCOUNTS,
            payload: true
        })

        const response = await axios.get(url, { headers })

        dispatch({
            type: FETCH_SUB_ACCOUNTS,
            payload: response.data.data
        })
        
    }
    catch(error){
        dispatch( {
            type: SUB_ACCOUNTS_ERROR,
            error
        })
    }
}

export const createSubAccount = (payload) => async (dispatch) => {    
    try{
        const headers = authHeader()

        dispatch({
            type: CREATING_SUB_ACCOUNT,
            payload: true
        })

        const response = await axios.post(`${baseUrl}/invoices/create/with-items`, payload, { headers })
        
        dispatch({
            type: CREATE_SUB_ACCOUNT,
            payload: response.data.data
        })
        
    }
    catch(error){
        dispatch({
            type: SUB_ACCOUNTS_ERROR,
            error
        })
    }
}

export const clearCreatedSubAccount = () => async (dispatch) => {    
    dispatch({
        type: CREATE_SUB_ACCOUNT,
        payload: null
    })
}

export const updateSubAccount = (payload) => async (dispatch) => {    
    try{
        const headers = authHeader()

        dispatch({
            type: UPDATING_SUB_ACCOUNT,
            payload: true
        })

        const response = await axios.patch(`${baseUrl}/invoices/update`, payload, { headers })
        
        dispatch({
            type: UPDATE_SUB_ACCOUNT,
            payload: response.data.data
        })
        
    }
    catch(error){
        dispatch({
            type: SUB_ACCOUNTS_ERROR,
            error
        })
    }
}

export const clearUpdatedSubAccount = () => async (dispatch) => {    
    dispatch({
        type: SUB_ACCOUNTS_ERROR,
        payload: null
    })
}
