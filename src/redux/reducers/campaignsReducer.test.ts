import { FETCH_CAMPAIGNS_LOADING, FETCH_CAMPAIGNS_SUCCESS, FETCH_CAMPAIGNS_FAILED, ADD_CAMPAIGN } from "../actions/actionTypes";
import campaignsReducer, { campaignsStateType, initialState } from "./campaignsReducer";
import { campaignType } from '../types';

test ('returns default initial state when no action is passed', () => {
    const newState: campaignsStateType = campaignsReducer(undefined, {});
    expect(newState).toBe(initialState);
});

test('returns state with loading property as true', () => {
    const newState: campaignsStateType = campaignsReducer(undefined, { type: FETCH_CAMPAIGNS_LOADING });

    expect(newState.loading).toBe(true);
});

test('updates & returns error proprerty in the state', () => {
    const EXPECTED_ERROR_VALUE: string = 'Failed to fetch';
    const newState: campaignsStateType = campaignsReducer(undefined, { type: FETCH_CAMPAIGNS_FAILED, payload: EXPECTED_ERROR_VALUE });

    expect(newState.error).toBe(EXPECTED_ERROR_VALUE);
});

test('updates & returns gameList property in the state', () => {
    const arr: campaignType[] = [{ name: "1", id: "1", installs: [] }];
    const newState: campaignsStateType = campaignsReducer(undefined, { type: FETCH_CAMPAIGNS_SUCCESS, payload: arr });

    expect(newState.campaignsList[0].id).toBe("1");
});

test('adds new campaign to the state', () => {
    const newCampaignObj: campaignType = {name: "test-campaign", id: "10", installs: [] };

    const newState: campaignsStateType = campaignsReducer(undefined, { type: ADD_CAMPAIGN, payload: newCampaignObj });

    expect(newState.campaignsList[0].id).toBe("10");
});