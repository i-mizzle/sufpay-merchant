import { BILLERS_ERROR, CREATE_BILLER, CREATING_BILLER, FETCH_BILLER_CATEGORIES, FETCH_BILLER_PROFILES, FETCHING_BILLER_CATEGORIES, FETCHING_BILLER_PROFILES } from "../types";

const initialState = {
    loadingCategories: true,
    categories: [],
    loadingProfiles: true,
    profiles: [],
    billersError: null,
    creatingBiller: false,
    createdBiller: null
};
  
const billersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCHING_BILLER_CATEGORIES:
        return { 
            loadingCategories: action.payload 
        };
        case FETCH_BILLER_CATEGORIES:
        return { 
            loadingCategories: false,
            categories: action.payload  
        };
        case FETCHING_BILLER_PROFILES:
        return { 
            loadingProfiles: action.payload  
        };
        case FETCH_BILLER_PROFILES:
        return { 
            loadingProfiles: false,
            profiles: action.payload  
        };
        case CREATING_BILLER:
        return { 
            creatingBiller: action.payload  
        };
        case CREATE_BILLER:
        return { 
            creatingBiller: false,
            createdBiller: action.payload  
        };
        case BILLERS_ERROR:
        return { 
            loadingProfiles: false,
            creatingBiller: false,
            loadingCategories: false,
            billersError: action.payload  
        };
        default:
        return state;
    }
};
  
export default billersReducer;