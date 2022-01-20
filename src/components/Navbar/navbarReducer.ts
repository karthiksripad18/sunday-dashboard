export const OVERVIEW = 'OVERVIEW';
export const GAME_DETAILS = 'GAME_DETAILS';
export const PAGE_NOT_FOUND = 'PAGE_NOT_FOUND';
export const OVERVIEW_SCROLL = 'OVERVIEW_SCROLL';
export const GAME_DETAILS_SCROLL = 'GAME_DETAILS_SCROLL';
export const PAGE_NOT_FOUND_SCROLL = 'PAGE_NOT_FOUND_SCROLL';

const navbarReducer = (state, action) => {
    switch(action.type) {
        case OVERVIEW:
            return {
                bgColorClass: 'yellow-background',
                headerText: 'Games Overview',
                logoColor: 'white-icon',
                headerTextColor: 'white-text'
            }
        case GAME_DETAILS:
            return {
                bgColorClass: 'purple-background',
                headerText: 'Game Dashboard',
                logoColor: 'white-icon',
                headerTextColor: 'white-text'
            }
        case PAGE_NOT_FOUND:
            return {
                bgColorClass: 'white-background',
                headerText: 'Page Not Found',
                logoColor: 'black-icon',
                headerTextColor: 'black-text'
            }
        case OVERVIEW_SCROLL:
            return {
                bgColorClass: 'white-background',
                headerText: 'Games Overview',
                logoColor: 'black-icon',
                headerTextColor: 'black-text'
            }
        case GAME_DETAILS_SCROLL:
            return {
                bgColorClass: 'white-background',
                headerText: 'Game Dashboard',
                logoColor: 'black-icon',
                headerTextColor: 'black-text'
            }
        case PAGE_NOT_FOUND_SCROLL:
            return {
                bgColorClass: 'white-background',
                headerText: 'Page Not Found',
                logoColor: 'black-icon',
                headerTextColor: 'black-text'
            }
        default:
            return state;
    }
};

export default navbarReducer;