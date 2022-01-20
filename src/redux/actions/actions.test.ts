import moxios from 'moxios';

import { storeFactory } from '../../testUtils';
import { gamesStateType } from '../reducers/gamesReducer';
import { campaignsStateType } from '../reducers/campaignsReducer';
import { gameObjType, campaignType } from '../types';
import { fetchCampaigns, fetchGames } from './actions';

beforeEach(() => {
    moxios.install();
});

afterEach(() => {
    moxios.uninstall();
});

test('Fetchs GAMES from API & updates it to the store', () => {
    const store = storeFactory();
    const testResponse: gameObjType[] = [{createdAt: "", name: "test-1", icon: "", active: true, id: "1", installs: [], revenue: []}]

    moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
            status: 200,
            response: testResponse
        })
    });

    return store.dispatch(fetchGames()).then(() => {
        const { games: { gamesList } }: { games: gamesStateType } = store.getState();
        expect(gamesList[0].id).toBe("1");
    })
});

test('Updates error to the store after fetching GAMES is failed', () => {
    const store = storeFactory();
    const errorResponse: string = "Failed to fetch from the source";

    moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
            status: 500,
            response: errorResponse
        });
    });

    return store.dispatch(fetchGames()).then(() => {
        const { games: { error } }: { games: gamesStateType } = store.getState();
        expect(error).toBe(errorResponse);
    });
});

test('Fetchs CAMPAIGNS from API & updates it to the store', () => {
    const store = storeFactory();
    const testResponse: campaignType[] = [{ name: "test1", id: "1", installs: [] }]

    moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
            status: 200,
            response: testResponse
        })
    });

    return store.dispatch(fetchCampaigns()).then(() => {
        const { campaigns: { campaignsList } }: { campaigns: campaignsStateType } = store.getState();
        expect(campaignsList[0].id).toBe("1");
    })
});

test('Updates error to the store after fetching CAMPAIGNS is failed', () => {
    const store = storeFactory();
    const errorResponse: string = "Failed to fetch from the source";

    moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
            status: 500,
            response: errorResponse
        });
    });

    return store.dispatch(fetchCampaigns()).then(() => {
        const { campaigns: { error } }: { campaigns: gamesStateType } = store.getState();
        expect(error).toBe(errorResponse);
    });
});
