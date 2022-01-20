import { shallow } from 'enzyme';

import { findByTestAttr } from '../../testUtils';
import GameStat, { StatBoardPropType } from './StatBoard';

const setup = (props: StatBoardPropType) => {
    return shallow(<GameStat {...props} />)
}

test('renders without error', () => {
    const props: StatBoardPropType = { count: 99, name: "Avg. insalls"}
    const wrapper = setup(props);

    const component = findByTestAttr(wrapper, 'component-statboard');

    expect(component.length).toBe(1);
});