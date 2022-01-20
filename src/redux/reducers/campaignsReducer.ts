import { 
    FETCH_CAMPAIGNS_FAILED, 
    FETCH_CAMPAIGNS_LOADING, 
    FETCH_CAMPAIGNS_SUCCESS, 
    ADD_CAMPAIGN 
} from '../actions/actionTypes';
import { campaignType } from '../types';

export type campaignsStateType = {
    loading: boolean;
    error: null | string;
    campaignsList: campaignType[];
}

export const initialState: campaignsStateType = {
    loading: false,
    error: null,
    campaignsList: JSON.parse(sessionStorage.getItem('campaignsList') || '[]')
};

const campaignsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CAMPAIGNS_LOADING:
            return {
                ...state,
                loading: true
            }
        case FETCH_CAMPAIGNS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                campaignsList: action.payload
            }
        case FETCH_CAMPAIGNS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case ADD_CAMPAIGN:
            return {
                ...state,
                campaignsList: [...state.campaignsList, action.payload]
            }
        default:
            return state;
    }
}

export default campaignsReducer;