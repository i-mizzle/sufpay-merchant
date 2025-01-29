import axios from "axios"
import { authHeader, baseUrl } from "../../utils"
import { BILLERS_ERROR, CREATE_BILLER, CREATING_BILLER, FETCH_BILLER_CATEGORIES, FETCH_BILLER_PROFILES, FETCHING_BILLER_CATEGORIES, FETCHING_BILLER_PROFILES } from "../types"

export const fetchBillerCategories = (filterString, page, perPage) => async (dispatch) => {    
    try{
        const headers = authHeader()

        let url = `${baseUrl}:${process.env.REACT_APP_BILLER_PORT}/biller-category/get/all?pagesize=1000&pagenumber=1000`
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
            type: FETCHING_BILLER_CATEGORIES,
            payload: true
        })

        const response = await axios.get(url, { headers })
        console.log(response)
        dispatch({
            type: FETCH_BILLER_CATEGORIES,
            payload: response.data
        })
        
    }
    catch(error){
        dispatch( {
            type: BILLERS_ERROR,
            error
        })
    }
}

export const fetchBillerProfiles = (filterString, page, perPage) => async (dispatch) => {    
    try{
        const headers = authHeader()

        let url = `${baseUrl}:${process.env.REACT_APP_BILLER_PORT}/biller-profile/get/all`
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
            type: FETCHING_BILLER_PROFILES,
            payload: true
        })

        const response = await axios.get(url, { headers })

        dispatch({
            type: FETCH_BILLER_PROFILES,
            payload: response.data.data
        })
        
    }
    catch(error){
        dispatch( {
            type: BILLERS_ERROR,
            error
        })
    }
}

export const createBiller = (payload) => async (dispatch) => {    
    try{
        const headers = authHeader()

        dispatch({
            type: CREATING_BILLER,
            payload: true
        })

        const response = await axios.post(`${baseUrl}:${process.env.REACT_APP_BILLER_PORT}/billers/biller/create`, payload, { headers })
        
        dispatch({
            type: CREATE_BILLER,
            payload: response.data.data
        })
        
    }
    catch(error){
        dispatch({
            type: BILLERS_ERROR,
            error
        })
    }
}