import axios from "axios"
import { authHeader, baseUrl } from "../../utils"
import { CREATE_API_KEY, CREATING_API_KEY, FETCH_API_KEYS, FETCH_BANKS, FETCHING_API_KEYS, FETCHING_BANKS, PAYMENTS_ERROR } from "../types"

export const fetchBanks = () => async (dispatch) => {    
    try{
        const headers = authHeader()

        let url = `${baseUrl}/payments/banks`

        dispatch({
            type: FETCHING_BANKS,
            payload: true
        })

        const response = await axios.get(url, { headers })

        dispatch({
            type: FETCH_BANKS,
            payload: response.data
        })
    }
    catch(error){
        dispatch( {
            type: PAYMENTS_ERROR,
            error
        })
    }
}

export const fetchApiKeys = (billerId) => async (dispatch) => {    
    try{
        const headers = authHeader()

        let url = `${baseUrl}/payments/api-keys/get/biller/${billerId}`

        dispatch({
            type: FETCHING_API_KEYS,
            payload: true
        })

        const response = await axios.get(url, { headers })

        dispatch({
            type: FETCH_API_KEYS,
            payload: response.data
        })
        
    }
    catch(error){
        dispatch( {
            type: PAYMENTS_ERROR,
            error
        })
    }
}

export const createApiKeys = (payload) => async (dispatch) => {    
    try{
        const headers = authHeader()

        dispatch({
            type: CREATING_API_KEY,
            payload: true
        })

        const response = await axios.post(`${baseUrl}/payments/api-keys/create/biller`, payload, { headers })
        
        dispatch({
            type: CREATE_API_KEY,
            payload: response.data
        })
        
    }
    catch(error){
        dispatch({
            type: PAYMENTS_ERROR,
            error
        })
    }
}