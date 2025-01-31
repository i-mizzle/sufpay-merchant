import axios from "axios"
import { authHeader, baseUrl, activeBusiness } from "../../utils"
import { CREATE_CUSTOMER, CREATING_CUSTOMER, CUSTOMERS_ERROR, FETCH_CUSTOMERS, FETCHING_CUSTOMERS } from "../types"

export const fetchCustomers = (filterString, page, perPage) => async (dispatch) => {    
    try{
        const headers = authHeader()

        let url = `${baseUrl}/billers/customer/get/biller/${activeBusiness().id}`
        if(filterString && filterString !== '') {
            url += `${url.includes('?') ? '&' : '?'}${filterString}`
        }

        if(page && page!=='') {
            url += `${url.includes('?') ? '&' : '?'}page=${page}`
        }

        if(perPage && perPage!=='') {
            url += `${url.includes('?') ? '&' : '?'}perPage=${perPage}`
        }

        dispatch( {
            type: FETCHING_CUSTOMERS,
            payload: true
        })

        const response = await axios.get(url, { headers })

        dispatch({
            type: FETCH_CUSTOMERS,
            payload: response.data
        })
        
    }
    catch(error){
        console.error('error fetching customers: ', error)
        dispatch( {
            type: CUSTOMERS_ERROR,
            error
        })
    }
}

export const createCustomer = (payload) => async (dispatch) => {    
    try{
        const headers = authHeader()

        dispatch({
            type: CREATING_CUSTOMER,
            payload: true
        })

        const response = await axios.post(`${baseUrl}/billers/customer/create`, payload, { headers })
        
        dispatch({
            type: CREATE_CUSTOMER,
            payload: response
        })
        
    }
    catch(error){
        dispatch({
            type: CUSTOMERS_ERROR,
            error
        })
    }
}

export const clearCreatedCustomer = () => async (dispatch) => {    
    dispatch({
        type: CREATE_CUSTOMER,
        payload: null
    })
}