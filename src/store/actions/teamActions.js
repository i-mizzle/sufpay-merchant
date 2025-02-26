import axios from "axios"
import { authHeader, baseUrl, activeBusiness } from "../../utils"
import { CREATE_TEAMMATE, CREATING_TEAMMATE, FETCH_TEAMMATES, FETCHING_TEAMMATES, TEAMMATES_ERROR, UPDATE_TEAMMATE, UPDATING_TEAMMATE } from "../types"

export const fetchPendingInvites = (page, perPage) => async (dispatch) => {    
    try{
        const headers = authHeader()

        let url = `${baseUrl}/authentication/invites/get/biller/${activeBusiness().id}?status=PENDING`

        if(page && page!=='') {
            url += `${url.includes('?') ? '&' : '?'}pagenumber=${page}`
        }

        if(perPage && perPage!=='') {
            url += `${url.includes('?') ? '&' : '?'}pagesize=${perPage}`
        }

        dispatch( {
            type: FETCHING_TEAMMATES,
            payload: true
        })

        const response = await axios.get(url, { headers })

        dispatch({
            type: FETCH_TEAMMATES,
            payload: response.data.data
        })
        
    }
    catch(error){
        dispatch( {
            type: TEAMMATES_ERROR,
            error
        })
    }
}

export const fetchTeammates = (filterString, page, perPage) => async (dispatch) => {    
    try{
        const headers = authHeader()

        let url = `${baseUrl}/authentication/users/get/biller/${activeBusiness().id}`
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
            type: FETCHING_TEAMMATES,
            payload: true
        })

        const response = await axios.get(url, { headers })

        dispatch({
            type: FETCH_TEAMMATES,
            payload: response.data.data
        })
        
    }
    catch(error){
        dispatch( {
            type: TEAMMATES_ERROR,
            error
        })
    }
}

export const inviteTeammate = (payload) => async (dispatch) => {    
    try{
        const headers = authHeader()

        dispatch({
            type: CREATING_TEAMMATE,
            payload: true
        })

        const response = await axios.post(`${baseUrl}/authentication/invite-user`, payload, { headers })
        
        dispatch({
            type: CREATE_TEAMMATE,
            payload: response.data.data
        })
        
    }
    catch(error){
        dispatch({
            type: TEAMMATES_ERROR,
            error
        })
    }
}

export const clearCreatedTeammate = () => async (dispatch) => {    
    dispatch({
        type: CREATE_TEAMMATE,
        payload: null
    })
}

export const updateTeammate = (payload) => async (dispatch) => {    
    try{
        const headers = authHeader()

        dispatch({
            type: UPDATING_TEAMMATE,
            payload: true
        })

        const response = await axios.patch(`${baseUrl}/invoices/update`, payload, { headers })
        
        dispatch({
            type: UPDATE_TEAMMATE,
            payload: response.data.data
        })
        
    }
    catch(error){
        dispatch({
            type: TEAMMATES_ERROR,
            error
        })
    }
}

export const clearUpdatedTeammate = () => async (dispatch) => {    
    dispatch({
        type: TEAMMATES_ERROR,
        payload: null
    })
}
