import React from 'react';
import { gameObjType, gameMetricType } from '../../redux/types';
import StatBoard from '../StatBoard/StatBoard';

import './GameTile.css';

// Returns Average value of the array elements
export const getAvg = (array: gameMetricType[]): number => {
    if (array.length > 0) {
        return Math.floor(array.reduce((sum: number, { value }) => sum + value, 0)/array.length);
    }
    return 0;
}

const GameTile = ({ name, icon, active, installs, revenue }: gameObjType): JSX.Element => {
    const avgInstalls: number = getAvg(installs);
    const avgRevenue: number = getAvg(revenue);

    return (
        <div data-test="component-game-tile" className={active? 'game-tile zoom': 'game-tile disable'}>
            <div className='game-tile__game-name'>
                <img className='game-tile-img' src={icon} alt={name} height={80} width={80} />
                <p>{name}</p>
            </div>
            <div className='game-tile__game-stats'>
                <StatBoard count={installs.length} name={'Campaigns'} />
                <StatBoard count={avgInstalls} name={'Avg. installs'} />
                <StatBoard count={avgRevenue} name={'Avg. revenue'} />
            </div>
        </div>
    )
}

export default GameTile;
