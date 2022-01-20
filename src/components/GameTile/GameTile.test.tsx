import { shallow } from 'enzyme';

import { findByTestAttr } from '../../testUtils';
import GameTile, { getAvg } from './GameTile';
import { gameObjType, gameMetricType } from '../../redux/types';

const setup = (props: gameObjType) => {
    return shallow(<GameTile {...props} />)
}

test('renders without error', () => {
    const props: gameObjType = {"createdAt":"","name":"id","icon":"","active":true,"id":"1","installs":[],"revenue":[]}
    const wrapper = setup(props);
    const component = findByTestAttr(wrapper, 'component-game-tile');

    expect(component.length).toBe(1);
});

test('component should zoom when active is true', () => {
    const props: gameObjType = {"createdAt":"","name":"id","icon":"","active": true,"id":"1","installs":[],"revenue":[]}
    const wrapper = setup(props);
    const component = findByTestAttr(wrapper, 'component-game-tile');

    expect(component.hasClass('zoom')).toBe(true);
});

test('component should be disabled when active is false', () => {
    const props: gameObjType = {"createdAt":"","name":"id","icon":"","active": false,"id":"1","installs":[],"revenue":[]}
    const wrapper = setup(props);
    const component = findByTestAttr(wrapper, 'component-game-tile');

    expect(component.hasClass('disable')).toBe(true);
});

test('Test for - getAvg() function', () => {
    const arr: gameMetricType[] = [{"day":"day 1","value":61,"id":"1","appId":"1"},{"day":"day 6","value":54,"id":"6","appId":"1"},{"day":"day 11","value":88,"id":"11","appId":"1"},{"day":"day 16","value":16,"id":"16","appId":"1"},{"day":"day 21","value":48,"id":"21","appId":"1"}];

    expect(getAvg(arr)).toBe(53);
});