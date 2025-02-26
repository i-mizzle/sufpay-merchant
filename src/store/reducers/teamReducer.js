import { CREATE_TEAMMATE, CREATING_TEAMMATE, FETCH_TEAMMATES, FETCHING_TEAMMATES, TEAMMATES_ERROR } from "../types";

const initialState = {
    loadingTeammates: true,
    teammates: [],
    invitingTeammate: false,
    invitedTeammate: null,
    teammatesError: null,
};
  
const teammatesReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATING_TEAMMATE:
        return { 
            invitingTeammate: action.payload 
        };
        case CREATE_TEAMMATE:
        return { 
            invitingTeammate: false,
            invitedTeammate: action.payload  
        };
        case FETCHING_TEAMMATES:
        return { 
            loadingTeammates: action.payload 
        };
        case FETCH_TEAMMATES:
        return { 
            loadingTeammates: false,
            teammates: action.payload  
        };
        case TEAMMATES_ERROR:
        return { 
            loadingTeammates: false,
            teammatesError: action.payload  
        };
        default:
        return state;
    }
};
  
export default teammatesReducer;