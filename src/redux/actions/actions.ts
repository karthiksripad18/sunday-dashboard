import axios from 'axios';
import { Dispatch } from 'react';
import { gameObjType, campaignType } from '../types';
import { 
    FETCH_GAMES_LOADING,
    FETCH_GAMES_SUCCESS, 
    FETCH_GAMES_FAILED, 
    FETCH_CAMPAIGNS_LOADING, 
    FETCH_CAMPAIGNS_FAILED, 
    FETCH_CAMPAIGNS_SUCCESS 
} from './actionTypes';

// Fetches Games from the API & Updates the Store
export const fetchGames = () => {
    return async (dispatch: Dispatch<any>) => {
        try {
            dispatch({
                type: FETCH_GAMES_LOADING
            });
            const { data }: { data: gameObjType[] } = await axios.get(`https://${process.env.REACT_APP_API_URL}/app`);
            sessionStorage.setItem('gameList', JSON.stringify(data));
            dispatch({
                type: FETCH_GAMES_SUCCESS,
                payload: data
            });
        } catch (err: any) {
            dispatch({
                type: FETCH_GAMES_FAILED,
                payload: err?.response.data
            })
        }
    }
}

// Fetches Campaigns from the API $ updates the store
export const fetchCampaigns = () => {
    return async (dispatch: Dispatch<any>) => {
        try {
            dispatch({
                type: FETCH_CAMPAIGNS_LOADING
            })

            const { data }: { data: campaignType[] } = await axios.get(`https://${process.env.REACT_APP_API_URL}/campaign`);
            sessionStorage.setItem('campaigns', JSON.stringify(data));

            dispatch({
                type: FETCH_CAMPAIGNS_SUCCESS,
                payload: data
            });
        } catch (err: any) {
            dispatch({
                type: FETCH_CAMPAIGNS_FAILED,
                payload: err?.response.data
            })
        }
    }
}