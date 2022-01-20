import { FETCH_GAMES_FAILED, FETCH_GAMES_LOADING, FETCH_GAMES_SUCCESS } from "../actions/actionTypes";
import { gameObjType } from "../types";
import gamesReducer, { initialState, gamesStateType } from "./gamesReducer";

test ('returns default initial state when no action is passed', () => {
    const newState: gamesStateType = gamesReducer(undefined, {});
    expect(newState).toBe(initialState);
});

test('returns state with loading property as true', () => {
    const newState: gamesStateType = gamesReducer(undefined, { type: FETCH_GAMES_LOADING });

    expect(newState.loading).toBe(true);
});

test('updates & returns error proprerty in the state', () => {
    const EXPECTED_ERROR_VALUE: string = 'Failed to fetch';
    const newState: gamesStateType = gamesReducer(undefined, { type: FETCH_GAMES_FAILED, payload: EXPECTED_ERROR_VALUE });

    expect(newState.error).toBe(EXPECTED_ERROR_VALUE);
});

test('updates & returns gameList property in the state', () => {
    const arr: gameObjType[] = [{ createdAt: "", name: "1", id: "1", icon: "", active: true, installs: [], revenue: []}];
    const newState: gamesStateType = gamesReducer(undefined, { type: FETCH_GAMES_SUCCESS, payload: arr });

    expect(newState.gamesList[0].id).toBe("1");
});