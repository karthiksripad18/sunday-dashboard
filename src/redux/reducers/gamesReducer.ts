import { FETCH_GAMES_FAILED, FETCH_GAMES_LOADING, FETCH_GAMES_SUCCESS } from "../actions/actionTypes";
import { gameObjType } from "../types";

export type gamesStateType = {
    loading: boolean;
    error: null | string;
    gamesList: gameObjType[];
}

export const initialState: gamesStateType = {
    loading: false,
    error: null,
    gamesList: JSON.parse(sessionStorage.getItem('gameList') || '[]')
};

const gamesReducer = (state = initialState, action): gamesStateType => {
    switch(action.type) {
        case FETCH_GAMES_LOADING:
            return {
                ...state,
                loading: true
            };
        case FETCH_GAMES_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                gamesList: action.payload
            };
        case FETCH_GAMES_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default gamesReducer;